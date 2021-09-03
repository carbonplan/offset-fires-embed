import { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const Project = ({ data, year, zoom }) => {
  const [projectPath, setProjectPath] = useState(null)
  const [firePaths, setFirePaths] = useState({})
  const [statesPath, setStatesPath] = useState(null)

  const { number, id, name } = data

  useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-research/offset-fires/grist/projects/'
    const url = prefix + `${id}/shape.json`

    const statesUrl =
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/states-10m.json'

    json(url).then((data) => {
      const projection = geoAlbersUsa().fitExtent(
        [
          [20, 20],
          [380, 180],
        ],
        data.features[0].geometry
      )
      setProjectPath(
        geoPath().projection(projection)(data.features[0].geometry)
      )
      const fireUrl = prefix + `${id}/fires.json`
      json(fireUrl).then((fireData) => {
        console.log(fireData)
        const firePathsTmp = {}
        Array(38)
          .fill(0)
          .map((d, i) => {
            firePathsTmp[i] = geoPath().projection(projection)(
              fireData.features[i].geometry
            )
          })
        setFirePaths(firePathsTmp)
        json(statesUrl).then((statesData) => {
          setStatesPath(
            geoPath().projection(projection)(
              feature(statesData, statesData.objects.states)
            )
          )
        })
      })
    })
  }, [])

  return (
    <>
      <Box sx={{ pb: [2] }}>
        <Box
          as='span'
          sx={{ color: 'secondary', fontFamily: 'mono', letterSpacing: 'mono' }}
        >
          {number}
        </Box>
        <Box as='span' sx={{ pl: [2], fontSize: [4, 4, 4, 5] }}>
          {name}
        </Box>
      </Box>
      <Box
        sx={{
          mt: [2],
          mb: [4],
          border: ({ colors }) => `solid 1px ${colors.muted}`,
        }}
      >
        <Box as='svg' viewBox='0 0 400 200' sx={{ mb: '-4px' }}>
          <Box
            as='g'
            transform={
              zoom
                ? 'scale(1.0) translate(0,0)'
                : 'scale(0.2) translate(800,400)'
            }
            sx={{ transition: 'transform(0.5s)' }}
          >
            <g strokeLinejoin='round' strokeLinecap='round'>
              <Box
                as='path'
                sx={{ stroke: 'none', fill: 'primary' }}
                d={projectPath}
              />
              {Array(year)
                .fill(0)
                .map((d, i) => {
                  return (
                    <Box
                      key={i}
                      as='path'
                      sx={{ stroke: 'none', fill: 'red' }}
                      d={firePaths[i]}
                    />
                  )
                })}
              <Box
                as='path'
                sx={{
                  opacity: zoom ? 0 : 1,
                  strokeWidth: 0.5,
                  stroke: 'primary',
                  fill: 'none',
                  vectorEffect: 'non-scaling-stroke',
                }}
                d={statesPath}
              />
            </g>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default Project
