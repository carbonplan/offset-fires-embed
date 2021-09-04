import { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])

const Minimap = ({ data }) => {
  const [country, setCountry] = useState(null)
  const [states, setStates] = useState(null)

  useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/'
    const urlCountry = prefix + 'conus-albers-simplified.json'
    const urlStates = prefix + 'states-albers-10m.json'
    json(urlCountry).then((us) => {
      setCountry(geoPath()(feature(us, us.objects.states)))
    })
    json(urlStates).then((us) => {
      setCountry(geoPath()(feature(us, us.objects.states)))
    })
  }, [])

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
            d={country}
            sx={{
              stroke: 'secondary',
              strokeWidth: 0.5,
              vectorEffect: 'non-scaling-stroke',
            }}
          />
          <Box
            as='path'
            d={states}
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
