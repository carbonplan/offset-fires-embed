import { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])

const Minimap = ({ data, states }) => {
  return (
    <Box sx={{ pl: [0, 0, 8, 8] }}>
      <Box
        as='svg'
        viewBox='0 0 975 500'
        sx={{ stroke: 'primary', fill: 'none' }}
      >
        <g
          transform={'scale(2.3) translate(50,-20)'}
          strokeLinejoin='round'
          strokeLinecap='round'
          strokeWidth='2'
        >
          <Box
            as='path'
            d={geoPath().projection(projection)(states)}
            sx={{
              stroke: 'secondary',
              strokeWidth: 0.5,
              vectorEffect: 'non-scaling-stroke',
            }}
          />
          {data.map((d) => {
            return (
              <Box
                key={d.number}
                as='text'
                sx={{
                  stroke: 'none',
                  fill: 'secondary',
                  fontFamily: 'mono',
                  fontSize: [4],
                }}
                dx={-7}
                dy={9}
                transform={`translate(${projection(d.centroid).join(',')})`}
              >
                {d.number}
              </Box>
            )
          })}
        </g>
      </Box>
    </Box>
  )
}

export default Minimap
