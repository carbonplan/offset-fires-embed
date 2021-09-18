import { useState, useEffect } from 'react'
import { Box, Flex } from 'theme-ui'
import { Row, Column, Slider } from '@carbonplan/components'
import Layout from '../../components/layout'
import Minimap from '../../components/minimap'
import Project from '../../components/project'
import useStates from '../../components/use-states'

const projects = [
  {
    id: 'ACR255',
    name: 'Colville',
    number: 1,
    centroid: [-118.63739, 48.25508],
  },
  {
    id: 'ACR260',
    name: 'Warm Springs',
    number: 2,
    centroid: [-121.6897, 44.75978],
  },
  {
    id: 'ACR273',
    name: 'Klamath East',
    number: 3,
    centroid: [-121.22172, 42.72968],
  },
  {
    id: 'ACR274',
    name: 'Klamath West',
    number: 4,
    centroid: [-122.11735, 42.16019],
  },
  {
    id: 'CAR1046',
    name: 'Trinity',
    number: 5,
    centroid: [-123.49326, 40.55713],
  },
  {
    id: 'CAR1174',
    name: 'Eddie Ranch',
    number: 6,
    centroid: [-123.09825, 39.37204],
  },
]

const years = Array(38)
  .fill(0)
  .map((d, i) => i + 1984)

const Index = () => {
  const [yearStart, setYearStart] = useState(29)
  const [yearEnd, setYearEnd] = useState(36)
  const [zoom, setZoom] = useState('near')
  const [sliderChanging, setSliderChanging] = useState(false)
  const states = useStates()

  useEffect(() => {
    if (yearEnd < yearStart) {
      setYearEnd(yearStart)
    }
  }, [yearEnd])

  useEffect(() => {
    if (yearStart > yearEnd) {
      setYearStart(yearEnd)
    }
  }, [yearStart])

  return (
    <Layout embed='medium'>
      <Box sx={{ width: '100%', height: '100%', bg: 'background', p: [5] }}>
        <Row columns={[2, 3, 3, 3]} sx={{ mb: [3] }}>
          <Column start={1} width={[2, 2, 2, 2]}>
            <Box
              sx={{
                fontFamily: 'heading',
                lineHeight: 'heading',
                fontSize: [4, 5, 5, 5],
              }}
            >
              Offset projects and fires
            </Box>
            <Box
              sx={{
                fontFamily: 'body',
                fontSize: [1, 1, 1, 2],
                lineHeight: 'body',
                py: [3],
              }}
            >
              Several forest offset projects in California, Oregon, and
              Washington are in locations with a substantial record of
              historical fire. Fires are shown for the range of years selected
              range using the slider at the bottom. Project boundaries turn
              white when their start date is at or prior to the initial selected
              year. The plus and minus zooms in and out to help situate the
              project. Fire perimeters from the MTBS database (1984 through
              2018) and from NIFC (2019 and 2020).
            </Box>
          </Column>
          <Column start={[1, 3, 3, 3]} width={[2, 1, 1, 1]}>
            <Minimap data={projects} states={states} />
          </Column>
        </Row>
        <Row columns={[1, 3, 3, 3]}>
          <Column start={1} width={1}>
            <Project
              data={projects[0]}
              states={states}
              yearStart={yearStart}
              yearEnd={yearEnd}
              zoom={zoom}
            />
          </Column>
          <Column start={[1, 2, 2, 2]} width={1}>
            <Project
              data={projects[1]}
              states={states}
              yearStart={yearStart}
              yearEnd={yearEnd}
              zoom={zoom}
            />
          </Column>
          <Column start={[1, 3, 3, 3]} width={1}>
            <Project
              data={projects[2]}
              states={states}
              yearStart={yearStart}
              yearEnd={yearEnd}
              zoom={zoom}
            />
          </Column>
          <Column start={1} width={1}>
            <Project
              data={projects[3]}
              states={states}
              yearStart={yearStart}
              yearEnd={yearEnd}
              zoom={zoom}
            />
          </Column>
          <Column start={[1, 2, 2, 2]} width={1}>
            <Project
              data={projects[4]}
              states={states}
              yearStart={yearStart}
              yearEnd={yearEnd}
              zoom={zoom}
            />
          </Column>
          <Column start={[1, 3, 3, 3]} width={1}>
            <Project
              data={projects[5]}
              states={states}
              yearStart={yearStart}
              yearEnd={yearEnd}
              zoom={zoom}
            />
          </Column>
        </Row>
        <Row columns={[2, 3, 3, 3]} sx={{ mt: [3], mb: [0, 3, 3, 3] }}>
          <Column start={1} width={[3, 2, 2, 2]}>
            <Flex>
              <Box
                sx={{
                  textTransform: 'uppercase',
                  fontFamily: 'heading',
                  letterSpacing: 'smallcaps',
                  mt: '-2px',
                  pr: [5],
                }}
              >
                Year
              </Box>
              <Box sx={{ position: 'relative', width: '100%' }}>
                <Box
                  as='span'
                  sx={{
                    mt: ['-24px'],
                    fontSize: [1, 1, 1, 2],
                    fontFamily: 'mono',
                    color: 'red',
                    position: 'absolute',
                    transform: 'translateX(-50%)',
                    letterSpacing: 'mono',
                    left: [`${yearStart * (97 / (years.length - 1)) + 1.5}%`],
                    opacity: sliderChanging ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                >
                  {yearStart + 1984}
                </Box>
                <Box
                  as='span'
                  sx={{
                    mt: ['-24px'],
                    fontSize: [1, 1, 1, 2],
                    fontFamily: 'mono',
                    color: 'red',
                    position: 'absolute',
                    transform: 'translateX(-50%)',
                    letterSpacing: 'mono',
                    left: [`${yearEnd * (97 / (years.length - 1)) + 1.5}%`],
                    opacity: sliderChanging ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                >
                  {yearEnd + 1984}
                </Box>
                <Box
                  as='span'
                  sx={{
                    mt: ['8px'],
                    bg: 'red',
                    position: 'absolute',
                    left: [`${yearStart * (97 / (years.length - 1)) + 1.5}%`],
                    opacity: 1,
                    width: `${
                      yearEnd * (97 / (years.length - 1)) +
                      1.5 -
                      (yearStart * (97 / (years.length - 1)) + 1.5)
                    }%`,
                    height: '4px',
                    zIndex: 1001,
                    pointerEvents: 'none',
                  }}
                />
                <Box>
                  <Slider
                    sx={{
                      color: 'red',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      pointerEvents: 'none',
                      ':focus': {
                        color: 'red',
                        '&::-webkit-slider-thumb': {
                          boxShadow: ({ colors }) =>
                            `0 0 0 4px ${colors.secondary}`,
                        },
                        '&::-moz-range-thumb': {
                          boxShadow: ({ colors }) =>
                            `0 0 0 4px ${colors.secondary}`,
                        },
                      },
                      '&::-webkit-slider-thumb': {
                        height: [22, 18, 16],
                        width: [22, 18, 16],
                        boxShadow: ({ colors }) =>
                          `0 0 0 0px ${colors.secondary}`,
                        transition: 'box-shadow .15s ease',
                        pointerEvents: 'auto',
                        zIndex: 1001,
                      },
                      '&::-moz-range-thumb': {
                        height: [22, 18, 16],
                        width: [22, 18, 16],
                        boxShadow: ({ colors }) =>
                          `0 0 0 0px ${colors.secondary}`,
                        transition: 'box-shadow .15s ease',
                        pointerEvents: 'auto',
                        zIndex: 1001,
                      },
                    }}
                    value={yearStart}
                    step={1}
                    min={0}
                    max={years.length - 1}
                    onChange={(e) => setYearStart(parseFloat(e.target.value))}
                    onTouchStart={() => {
                      setSliderChanging(true)
                    }}
                    onTouchEnd={() => {
                      setSliderChanging(false)
                    }}
                    onMouseDown={() => {
                      setSliderChanging(true)
                    }}
                    onMouseUp={() => {
                      setSliderChanging(false)
                    }}
                    onKeyDown={() => {
                      setSliderChanging(true)
                    }}
                    onKeyUp={() => setSliderChanging(false)}
                  />
                  <Slider
                    sx={{
                      color: 'red',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      pointerEvents: 'none',
                      bg: 'transparent',
                      ':focus': {
                        color: 'red',
                        bg: 'transparent',
                        '&::-webkit-slider-thumb': {
                          boxShadow: ({ colors }) =>
                            `0 0 0 4px ${colors.secondary}`,
                        },
                        '&::-moz-range-thumb': {
                          boxShadow: ({ colors }) =>
                            `0 0 0 4px ${colors.secondary}`,
                        },
                      },
                      ':focus-visible': {
                        outline: 'none !important',
                        background: `transparent !important`,
                      },
                      '&::-webkit-slider-thumb': {
                        height: [22, 18, 16],
                        width: [22, 18, 16],
                        boxShadow: ({ colors }) =>
                          `0 0 0 0px ${colors.secondary}`,
                        transition: 'box-shadow .15s ease',
                        pointerEvents: 'auto',
                        zIndex: 1001,
                      },
                      '&::-moz-range-thumb': {
                        height: [22, 18, 16],
                        width: [22, 18, 16],
                        boxShadow: ({ colors }) =>
                          `0 0 0 0px ${colors.secondary}`,
                        transition: 'box-shadow .15s ease',
                        pointerEvents: 'auto',
                        zIndex: 1001,
                      },
                    }}
                    value={yearEnd}
                    step={1}
                    min={0}
                    max={years.length - 1}
                    onChange={(e) => setYearEnd(parseFloat(e.target.value))}
                    onTouchStart={() => {
                      setSliderChanging(true)
                    }}
                    onTouchEnd={() => {
                      setSliderChanging(false)
                    }}
                    onMouseDown={() => {
                      setSliderChanging(true)
                    }}
                    onMouseUp={() => {
                      setSliderChanging(false)
                    }}
                    onKeyDown={() => {
                      setSliderChanging(true)
                    }}
                    onKeyUp={() => setSliderChanging(false)}
                  />
                </Box>
                <Box sx={{ mt: [3] }}>
                  {years.slice(1, years.length - 1).map((d, i) => {
                    if (i % 5 == 0) {
                      return (
                        <Box
                          key={i}
                          as='span'
                          sx={{
                            color: 'secondary',
                            fontFamily: 'mono',
                            letterSpacing: 'mono',
                            fontSize: [1, 1, 1, 2],
                            position: 'absolute',
                            top: '24px',
                            display: [
                              i % 10 == 0 ? 'inline-block' : 'none',
                              'inline-block',
                              'inline-block',
                              'inline-block',
                            ],
                            transform: 'translateX(-50%)',
                            left: [
                              `${(i + 1) * (97 / (years.length - 1)) + 1.5}%`,
                            ],
                          }}
                        >
                          {d}
                        </Box>
                      )
                    }
                  })}
                </Box>
              </Box>
            </Flex>
          </Column>
          <Column start={[1, 3, 3, 3]} width={[3, 1, 1, 1]}>
            <Flex
              sx={{
                justifyContent: [
                  'flex-start',
                  'flex-end',
                  'flex-end',
                  'flex-end',
                ],
              }}
            >
              <Box
                sx={{
                  textTransform: 'uppercase',
                  fontFamily: 'heading',
                  letterSpacing: 'smallcaps',
                  mt: [5, '-2px', '-2px', '-2px'],
                  pr: [2],
                }}
              >
                Zoom
              </Box>
              <Box
                as='button'
                onClick={() => {
                  setZoom('far')
                }}
                sx={{
                  color: 'primary',
                  border: 'none',
                  bg: 'transparent',
                  m: [0],
                  p: [0],
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: 'body',
                  letterSpacing: 'smallcaps',
                  mt: ['20px', '-14px', '-14px', '-14px'],
                  px: [2],
                  fontSize: [5, 5, 5, 6],
                  transition: 'color 0.15s',
                  '@media (hover: hover) and (pointer: fine)': {
                    '&:hover': {
                      color: 'secondary',
                    },
                  },
                }}
              >
                -
              </Box>
              <Box
                as='button'
                onClick={() => {
                  setZoom('near')
                }}
                sx={{
                  color: 'primary',
                  border: 'none',
                  bg: 'transparent',
                  m: [0],
                  p: [0],
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  fontFamily: 'body',
                  letterSpacing: 'smallcaps',
                  mt: ['20px', '-14px', '-14px', '-14px'],
                  px: [2],
                  fontSize: [5, 5, 5, 6],
                  transition: 'color 0.15s',
                  '@media (hover: hover) and (pointer: fine)': {
                    '&:hover': {
                      color: 'secondary',
                    },
                  },
                }}
              >
                +
              </Box>
            </Flex>
          </Column>
        </Row>
      </Box>
    </Layout>
  )
}

export default Index
