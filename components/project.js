import { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { useSpring, animated } from '@react-spring/web'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const Project = ({
  data,
  year,
  zoom,
  states,
  showStates = true,
  label = true,
  border = true,
}) => {
  const [projectPath, setProjectPath] = useState()
  const [firePaths, setFirePaths] = useState({})
  const [statesPath, setStatesPath] = useState()

  const { transform } = useSpring({
    config: { duration: 500, mass: 1, tension: 280, friction: 120 },
    transform:
      zoom === 'near'
        ? 'scale(1) translate(0,0)'
        : 'scale(0.3) translate(500,250)',
  })

  const { number, id, name } = data

  useEffect(() => {
    if (showStates && !states) return
    const prefix =
      'https://storage.googleapis.com/carbonplan-research/offset-fires/grist/projects/'
    const url = prefix + `${id}/shape.json`

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
      if (showStates) setStatesPath(geoPath().projection(projection)(states))
      const fireUrl = prefix + `${id}/fires_v4.json`
      json(fireUrl).then((fireData) => {
        const firePathsTmp = {}
        Array(38)
          .fill(0)
          .map((d, i) => {
            firePathsTmp[i] = geoPath().projection(projection)(
              fireData.features[i].geometry
            )
          })
        setFirePaths(firePathsTmp)
      })
    })
  }, [states])

  return (
    <>
      {label && (
        <Box sx={{ pb: [2] }}>
          <Box
            as='span'
            sx={{
              color: 'secondary',
              fontFamily: 'mono',
              letterSpacing: 'mono',
            }}
          >
            {number}
          </Box>
          <Box as='span' sx={{ pl: [2], fontSize: [3, 4, 4, 5] }}>
            {name}
          </Box>
        </Box>
      )}
      <Box
        sx={{
          mt: [2],
          mb: [4],
          border: ({ colors }) =>
            border ? `solid 1px ${colors.muted}` : 'none',
        }}
      >
        <Box as='svg' viewBox='0 0 400 200' sx={{ mb: '-4px' }}>
          <animated.g transform={transform}>
            <g strokeLinejoin='round' strokeLinecap='round'>
              <Box
                as='path'
                sx={{ stroke: 'none', fill: 'primary' }}
                d={projectPath}
              />
              {Array(year + 1)
                .fill(0)
                .map((d, i) => {
                  return (
                    <Box
                      key={i}
                      as='path'
                      sx={{ stroke: 'none', fill: 'red', opacity: 0.8 }}
                      d={firePaths[i]}
                    />
                  )
                })}
              {showStates && (
                <Box
                  as='path'
                  sx={{
                    opacity: 1,
                    strokeWidth: 0.5,
                    stroke: 'primary',
                    fill: 'none',
                    vectorEffect: 'non-scaling-stroke',
                  }}
                  d={statesPath}
                />
              )}
            </g>
          </animated.g>
        </Box>
      </Box>
    </>
  )
}

export default Project
