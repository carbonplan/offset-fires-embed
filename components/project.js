import { useEffect, useState } from 'react'
import { useThemeUI, Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { format } from 'd3-format'
import { useSpring, animated } from '@react-spring/web'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const Project = ({
  data,
  year,
  zoom,
  states,
  height = 140,
  showStates = true,
  showStartDate = true,
  showStats = true,
  label = true,
  border = true,
  stretch = false,
}) => {
  const [projectPath, setProjectPath] = useState()
  const [firePaths, setFirePaths] = useState({})
  const [statesPath, setStatesPath] = useState()
  const [startDate, setStartDate] = useState()
  const [startYear, setStartYear] = useState()
  const [metadata, setMetadata] = useState()
  const { theme } = useThemeUI()
  const { colors } = theme
  const { primary, secondary, red } = colors

  const { transform, opacity } = useSpring({
    config: { duration: 500, mass: 1, tension: 280, friction: 120 },
    transform:
      zoom === 'near'
        ? 'scale(1) translate(0,0)'
        : `scale(0.3) translate(500,${height * 1.3})`,
    opacity: zoom === 'far' ? 1 : 0,
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
          [380, height - 20],
        ],
        data.features[0].geometry
      )
      setStartDate(data.features[0].properties.start_date)
      setStartYear(parseInt(data.features[0].properties.start_date.slice(0, 4)))
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
          height: [
            'auto',
            stretch ? 'calc(100% - 72px)' : 'auto',
            stretch ? 'calc(100% - 72px)' : 'auto',
            stretch ? 'calc(100% - 72px)' : 'auto',
          ],
          border: ({ colors }) =>
            border ? `solid 1px ${colors.muted}` : 'none',
        }}
      >
        <Box as='svg' viewBox={`0 0 400 ${height}`} sx={{ mb: '-4px' }}>
          <animated.g transform={transform}>
            <g strokeLinejoin='round' strokeLinecap='round'>
              <path
                stroke='none'
                fill={
                  showStartDate
                    ? startYear - 1984 > year
                      ? secondary
                      : primary
                    : primary
                }
                style={{
                  transition: 'fill 0.15s',
                }}
                d={projectPath}
              />
              {Array(38)
                .fill(0)
                .map((d, i) => {
                  return (
                    <path
                      key={i}
                      as='path'
                      stroke='none'
                      fill={red}
                      style={{
                        fillOpacity: i === year ? 0.8 : 0,
                        transition: 'fill-opacity 0.15s',
                      }}
                      d={firePaths[i]}
                    />
                  )
                })}
            </g>
            <animated.path
              opacity={opacity}
              style={{
                strokeWidth: 0.5,
                stroke: primary,
                fill: 'none',
                vectorEffect: 'non-scaling-stroke',
              }}
              d={statesPath}
            />
          </animated.g>
        </Box>
        <Box sx={{ position: 'relative', mt: [6] }} />
        <Box sx={{ position: 'absolute', bottom: 0 }}>
          {showStartDate && (
            <Box
              sx={{
                position: 'relative',
                ml: 2,
                pt: 2,
                fontFamily: 'mono',
                letterSpacing: 'mono',
                fontSize: [0, 0, 0, 1],
                textTransform: 'uppercase',
              }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                PROJECT START:{' '}
              </Box>
              <Box
                as='span'
                sx={{
                  color: startYear - 1984 > year ? 'secondary' : 'primary',
                }}
              >
                {startYear}
              </Box>
            </Box>
          )}
          {showStats && (
            <Box
              sx={{
                position: 'relative',
                ml: 2,
                pb: 2,
                fontFamily: 'mono',
                letterSpacing: 'mono',
                fontSize: [0, 0, 0, 1],
              }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                BURN AREA:{' '}
              </Box>
              <Box
                as='span'
                sx={{
                  color: startYear - 1984 > year ? 'secondary' : 'primary',
                }}
              >
                {metadata &&
                (100 * metadata?.burned_acreage) / metadata?.acreage < 1
                  ? '<1%'
                  : format('.0%')(metadata?.burned_acreage / metadata?.acreage)}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}

export default Project
