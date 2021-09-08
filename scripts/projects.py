#!/usr/bin/env python3
from functools import lru_cache

import click
import fsspec
import geopandas
import pandas as pd
import requests
from shapely.geometry import box

crs = "+proj=aea +lat_0=23 +lon_0=-96 +lat_1=29.5 +lat_2=45.5 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"

projects = ['ACR273', 'ACR274', 'ACR255', 'CAR1174', 'CAR1046', 'ACR260']
years = list(range(1984, 2022))
simplification = {
    'ACR273': 250,
    'ACR274': 250,
    'ACR255': 300,
    'ACR260': 100,
    'CAR1174': 10,
    'CAR1046': 10,
}

simplification_fire = {
    'ACR273': 3000,
    'ACR274': 500,
    'ACR255': 500,
    'ACR260': 500,
    'CAR1174': 250,
    'CAR1046': 250,
}


@lru_cache
def load_project_db():
    retro_uri = requests.get(
        'https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/forest-offsets-database-v1.0.json'
    )
    retro_json = retro_uri.json()
    return retro_json


def buffer_and_simplify(gdf, distance=None):
    gdf_out = gdf.copy(deep=True)
    gdf_out['geometry'] = [
        g.buffer(100).buffer(-100).simplify(distance, preserve_topology=False) for g in gdf.geometry
    ]
    return gdf_out


def load_nifc_fires():
    '''load nifc data for 2020/2021 fire season

    NB this is a bit of an undocumented NIFC feature -- the data supposedly only cover 2021
    but there are definitely 2020 fires included at the endpoint.
    This might not be true in the future.

    https://data-nifc.opendata.arcgis.com/datasets/nifc::wfigs-wildland-fire-perimeters-full-history/about
    '''
    nifc_uri = 'https://storage.googleapis.com/carbonplan-data/raw/nifc/WFIGS_-_Wildland_Fire_Perimeters_Full_History.geojson'
    fires = geopandas.read_file(nifc_uri)

    nifc_colnames = {'poly_IncidentName': 'name', 'poly_Acres_AutoCalc': 'acres'}
    fires = fires.rename(columns=nifc_colnames)

    fires = fires[fires['irwin_FireDiscoveryDateTime'].str[:4].isin(['2020', '2021'])]

    fires['ignite_at'] = (
        fires['irwin_FireDiscoveryDateTime']
        .apply(pd.Timestamp)
        .apply(lambda x: pd.Timestamp(x.date()))
    )

    return fires.to_crs(crs)[['name', 'acres', 'ignite_at', 'geometry']]


def load_mtbs_fires():
    '''
    load mtbs data

    Originally from: https://www.mtbs.gov/direct-download
    '''
    fire_uri = 'https://storage.googleapis.com/carbonplan-data/raw/mtbs/mtbs_perimeter_data/mtbs_perims_DD.json'
    fires = geopandas.read_file(fire_uri)

    fires = fires[fires['Incid_Type'] == 'Wildfire']

    mtbs_colnames = {'Incid_Name': 'name', 'BurnBndAc': 'acres'}
    fires = fires.rename(columns=mtbs_colnames)

    fires['ignite_at'] = fires['Ig_Date'].apply(pd.Timestamp)

    return fires.to_crs(crs)[['name', 'acres', 'ignite_at', 'geometry']]


def load_fires():
    nifc = load_nifc_fires()
    mtbs = load_mtbs_fires()
    return pd.concat([nifc, mtbs])


def load_simple_project(project, distance=None):
    path = f'https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/projects/{project}/shape.json'
    gdf = geopandas.read_file(path).to_crs(crs)
    gdf = buffer_and_simplify(gdf, distance=distance)
    attributes = get_project_attributes(project)
    for k, v in attributes.items():
        gdf[k] = v
    return gdf


def get_project_attributes(opr_id):
    retro_json = load_project_db()
    project = [project for project in retro_json if project['opr_id'] == opr_id][0]
    return {'project_start_date': project['rp_1']['start_date']}


def make_project_fires(fires, project_shape, buffer=None, scale=1, distance=None):
    center = project_shape.centroid[0]
    bounds = project_shape.envelope[0].bounds
    if buffer is None:
        deltay = (bounds[3] - bounds[1]) / 2
        buffer = [deltay * 2 * scale, deltay * scale]
    envelope = box(
        center.x - buffer[0], center.y - buffer[1], center.x + buffer[0], center.y + buffer[1]
    )
    fires_proj = fires[fires.intersects(envelope)]
    fires_proj['year'] = pd.to_datetime(fires_proj['ignite_at']).dt.year
    fire_years = fires_proj[['year', 'geometry']].dissolve(by='year').reset_index()
    fire_years = buffer_and_simplify(fire_years, distance=distance)
    fire_years = fire_years.set_index('year').reindex(years).reset_index()
    return fire_years


@click.command()
@click.option("--upload-to", type=str, default=None, help="Where to put the workflow contents")
def main(upload_to):

    print('loading fire data')
    fires = load_fires()

    for project in projects:
        print(f'processing project {project}')

        distance = simplification.get(project, 250)
        distance_fire = simplification_fire.get(project, 250)

        print('-->loading and simplifying project shape')
        project_shape = load_simple_project(project, distance=distance)

        print('-->creating and simplifying fire shapes')
        fire_shape = make_project_fires(
            fires, project_shape, distance=distance_fire, buffer=None, scale=4
        )

        if upload_to:
            print(f'-->writing shapes to {upload_to}/{project}')
            with fsspec.open(f'{upload_to}/{project}/shape.json', 'w') as f:
                f.write(project_shape.to_crs('epsg:4326').to_json())

            with fsspec.open(f'{upload_to}/{project}/fires_v4.json', 'w') as f:
                f.write(fire_shape.to_crs('epsg:4326').to_json())


if __name__ == '__main__':
    main()
