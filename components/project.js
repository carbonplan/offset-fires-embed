import { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { Badge } from '@carbonplan/components'
import { json } from 'd3-fetch'
import { useSpring, animated } from '@react-spring/web'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const Project = ({
  data,
  yearStart,
  yearEnd,
  zoom,
  states,
  showStates = true,
  showStartDate = true,
  label = true,
  border = true,
  setMetadata,
}) => {
  const [projectPath, setProjectPath] = useState()
  const [firePaths, setFirePaths] = useState({})
  const [statesPath, setStatesPath] = useState()
  const [startDate, setStartDate] = useState()

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
    const url = prefix + `${id}/shape_v9.json`

    json(url).then((data) => {
      if (setMetadata) setMetadata(data.features[0].properties)
      const projection = geoAlbersUsa().fitExtent(
        [
          [20, 20],
          [380, 180],
        ],
        data.features[0].geometry
      )
      setStartDate(parseInt(data.features[0].properties.start_date.slice(0, 4)))
      setProjectPath(
        geoPath().projection(projection)(data.features[0].geometry)
      )
      if (showStates) setStatesPath(geoPath().projection(projection)(states))
      const fireUrl = prefix + `${id}/fires_v9.json`
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
          position: 'relative',
          borderRadius: '1px',
          border: ({ colors }) =>
            border ? `solid 1px ${colors.muted}` : 'none',
        }}
      >
        {showStartDate && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 2,
              left: 2,
              fontFamily: 'mono',
              letterSpacing: 'mono',
              fontSize: [0, 0, 0, 1],
            }}
          >
            <Badge
              sx={{
                transition: 'opacity 0.15s',
                opacity: startDate - 1984 > yearStart ? 0.6 : 0.9,
                fontSize: [0, 0, 0, 1],
                height: '20px',
                mb: [0],
                pb: [0],
              }}
            >
              INITIALIZED: {startDate}
            </Badge>
          </Box>
        )}
        <Box as='svg' viewBox='0 0 400 200' sx={{ mb: '-4px' }}>
          <animated.g transform={transform}>
            <g strokeLinejoin='round' strokeLinecap='round'>
              <Box
                as='path'
                sx={{
                  stroke: 'none',
                  fill: showStartDate
                    ? startDate - 1984 > yearStart
                      ? 'secondary'
                      : 'primary'
                    : 'primary',
                  transition: 'fill 0.15s',
                }}
                d={projectPath}
              />
              {Array(38)
                .fill(0)
                .map((d, i) => {
                  return (
                    <Box
                      key={i}
                      as='path'
                      sx={{
                        stroke: 'none',
                        fill: 'red',
                        fillOpacity: i >= yearStart && i <= yearEnd ? 0.8 : 0,
                        transition: 'fill-opacity 0.15s',
                      }}
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
