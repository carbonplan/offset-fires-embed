const style = {
  version: 8,
  glyphs: `https://storage.googleapis.com/carbonplan-data/tiles/glyphs/{fontstack}/{range}.pbf`,
  sources: {
    basemap: {
      type: 'vector',
      tiles: [
        `https://storage.googleapis.com/carbonplan-research/articles/offset-project-fire/basemap/{z}/{x}/{y}.pbf`,
      ],
      maxzoom: 5,
    },
    project: {
      type: 'geojson',
      data: `https://carbonplan.blob.core.windows.net/carbonplan-forests/offsets/database/projects/ACR255/shape.json`,
    },
    fires: {
      type: 'geojson',
      data: `https://storage.googleapis.com/carbonplan-research/offset-fires/ACR255_07-20-2021.json`,
    },
    'fire-label': {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              //description: 'BOOTLEG FIRE',
              description: 'Chuweah \n Creek Fire',
            },
            geometry: {
              type: 'Point',
              //coordinates: [-122.03942315702305, 42.38700925593174],
              coordinates: [-119.31337286758355, 47.73257407875702],
            },
          },
        ],
      },
    },
    'project-label': {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              //description: 'PROJECT\nACR273',
              description: 'PROJECT\nACR255',
            },
            geometry: {
              type: 'Point',
              //coordinates: [-120.83942315702305, 43.08700925593174],
              coordinates: [-118.41337286758355, 47.93257407875702],
            },
          },
        ],
      },
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: {
        'background-color': 'black',
        'background-opacity': 0,
      },
    },
    {
      id: 'land',
      type: 'fill',
      source: 'basemap',
      'source-layer': 'ne_10m_land',
      layout: { visibility: 'visible' },
      paint: {
        'fill-antialias': false,
        'fill-opacity': 0,
        'fill-color': 'black',
      },
    },
    {
      id: 'lakes',
      type: 'fill',
      source: 'basemap',
      'source-layer': 'ne_10m_lakes',
      layout: { visibility: 'visible' },
      paint: {
        'fill-antialias': false,
        'fill-opacity': 0,
        'fill-color': 'black',
      },
    },
    {
      id: 'rivers',
      type: 'line',
      source: 'basemap',
      'source-layer': 'ne_10m_rivers_lake_centerlines',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-blur': 0.4,
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 5,
      },
    },
    {
      id: 'countries',
      type: 'line',
      source: 'basemap',
      'source-layer': 'ne_10m_admin_0_countries',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-blur': 0.4,
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 0.8,
      },
    },
    {
      id: 'states',
      type: 'line',
      source: 'basemap',
      'source-layer': 'ne_10m_admin_1_states_provinces',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-blur': 0.4,
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 0.8,
      },
    },
    {
      id: 'roads',
      type: 'line',
      source: 'basemap',
      'source-layer': 'ne_10m_roads',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
        visibility: 'visible',
      },
      paint: {
        'line-blur': 0.4,
        'line-color': 'black',
        'line-opacity': 0,
        'line-width': 0.8,
      },
    },
    {
      id: 'places-points',
      type: 'circle',
      source: 'basemap',
      'source-layer': 'ne_10m_populated_places',
      paint: {
        'circle-color': 'white',
        'circle-opacity': 0,
        'circle-radius': 4,
      },
    },
    {
      id: 'places-text',
      type: 'symbol',
      source: 'basemap',
      'source-layer': 'ne_10m_populated_places',
      paint: {
        'text-color': 'white',
        'text-opacity': 0,
        'text-translate': [0, -18],
      },
      layout: {
        'text-ignore-placement': true,
        'text-font': ['relative-faux-book'],
        'text-field': ['format', ['get', 'name_en'], { 'font-scale': 1.2 }],
      },
    },
    {
      id: 'project-fill',
      type: 'fill',
      source: 'project',
      paint: {
        'fill-color': 'black',
        'fill-opacity': 0,
      },
    },
    {
      id: 'fires',
      type: 'fill',
      source: 'fires',
      paint: {
        'fill-color': 'black',
        'fill-opacity': 0,
      },
    },
    {
      id: 'fire-label',
      type: 'symbol',
      source: 'fire-label',
      paint: {
        'text-color': 'white',
        'text-opacity': 0,
      },
      layout: {
        'text-ignore-placement': true,
        'text-font': ['relative-faux-book'],
        'text-size': 20,
        'text-justify': 'left',
        'text-offset': [4, -6.25],
        'text-field': ['format', ['get', 'description']],
        'text-allow-overlap': true,
      },
    },
    {
      id: 'project-label',
      type: 'symbol',
      source: 'project-label',
      paint: {
        'text-color': 'white',
        'text-opacity': 0,
      },
      layout: {
        'text-ignore-placement': true,
        'text-font': ['relative-faux-book'],
        'text-size': 20,
        'text-justify': 'left',
        'text-offset': [4.25, 2],
        'text-field': ['format', ['get', 'description']],
        'text-allow-overlap': true,
      },
    },
  ],
}

export default style
