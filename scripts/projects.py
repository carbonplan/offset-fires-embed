import geopandas
import fsspec

projects = ['ACR273', 'ACR274', 'ACR255', 'CAR1174', 'CAR1046', 'ACR260']
simplification = {
    'ACR273': 250,
    'ACR274': 250,
    'ACR255': 300,
    'ACR260': 100,
    'CAR1174': 10,
    'CAR1046': 10
}
for project in projects:
    crs = "+proj=aea +lat_0=23 +lon_0=-96 +lat_1=29.5 +lat_2=45.5 +x_0=0 +y_0=0 +ellps=WGS84 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
    path = f'https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/projects/{project}/shape.json'
    gdf = geopandas.read_file(path).to_crs(crs)

    geo = gdf.buffer(100).buffer(-100).simplify(simplification[project], preserve_topology=False).unary_union
    gdf_out = geopandas.GeoDataFrame([0], geometry=[geo]).set_crs(crs)

    with open(f'{project}.json', 'w') as f:
        f.write(gdf_out.to_crs('epsg:4326').to_json())