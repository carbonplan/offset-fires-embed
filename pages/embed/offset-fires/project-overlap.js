import { useState, useEffect } from 'react'
import { Box, Flex } from 'theme-ui'
import { Row, Column, Monogram, Slider } from '@carbonplan/components'
import Layout from '../../../components/layout'
import Minimap from '../../../components/minimap'
import Project from '../../../components/project'
import useStates from '../../../components/use-states'

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
  const [year, setYear] = useState(36)
  const [zoom, setZoom] = useState('near')
  const [sliderChanging, setSliderChanging] = useState(false)
  const states = useStates()

  useEffect(() => {
    const resize = () => {
      if (document.body.clientWidth > 641) {
        const target = document.getElementById('project-0')
        const targetSvg = document.getElementById('project-0-svg')
        const ref1 = document.getElementById('project-1')
        const ref2 = document.getElementById('project-2')
        const offset = 68
        const newHeight = offset + ref1.offsetHeight + ref2.offsetHeight
        const newSvgHeight = 0.5 * (newHeight - 48 - targetSvg.clientHeight)
        target.style.height = newHeight + 'px'
        targetSvg.style.marginTop = newSvgHeight + 'px'
      } else {
        const target = document.getElementById('project-0')
        target.style.height = 'auto'
      }
    }
    resize()
    window.onresize = resize
  }, [])

  return (
    <Layout embed='medium'>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bg: 'background',
          px: [5],
          pb: [5],
          pt: [4],
        }}
      >
        <Row columns={[2, 3, 3, 3]} sx={{ mb: [4] }}>
          <Column start={1} width={[2, 2, 2, 2]}>
            <Box
              sx={{
                fontFamily: 'heading',
                lineHeight: 'heading',
                fontSize: [4, 5, 5, 5],
              }}
            >
              Offset projects
              <Box
                as='span'
                sx={{ display: ['none', 'unset', 'unset', 'unset'] }}
              >
                <br />
              </Box>{' '}
              and fires
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
              Washington are in locations with a record of historical fire. And
              many have experienced fires. Below, red regions show fires during
              the year selected using the slider at the bottom. White regions
              show projects and turn gray if the selected year is before the
              project’s start date. “Burn area” refers to the fraction of the
              project burned during its lifetime.
            </Box>
          </Column>
          <Column start={[1, 3, 3, 3]} width={[2, 1, 1, 1]}>
            <Minimap data={projects} states={states} />
          </Column>
        </Row>
        <Row columns={[1, 3, 3, 3]}>
          <Column start={1} width={[1, 2, 2, 2]}>
            <Project
              id={'project-0'}
              data={projects[0]}
              states={states}
              year={year}
              zoom={zoom}
              height={254.5}
              stretch
            />
          </Column>
          <Column start={[1, 3, 3, 3]} width={1}>
            <Project
              id={'project-1'}
              data={projects[1]}
              states={states}
              year={year}
              zoom={zoom}
            />
            <Project
              id={'project-2'}
              data={projects[2]}
              states={states}
              year={year}
              zoom={zoom}
              zoomFarScale={0.6}
              zoomFarTranslateX={150}
              zoomFarTranslateY={0.5}
            />
          </Column>
          <Column start={[1, 3, 3, 3]} width={1}></Column>
          <Column start={1} width={1}>
            <Project
              data={projects[3]}
              states={states}
              year={year}
              zoom={zoom}
            />
          </Column>
          <Column start={[1, 2, 2, 2]} width={1}>
            <Project
              data={projects[4]}
              states={states}
              year={year}
              zoom={zoom}
            />
          </Column>
          <Column start={[1, 3, 3, 3]} width={1}>
            <Project
              data={projects[5]}
              states={states}
              year={year}
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
                    left: [`${year * (97 / (years.length - 1)) + 1.5}%`],
                    opacity: sliderChanging ? 1 : 0,
                    transition: 'opacity 0.25s',
                  }}
                >
                  {year + 1984}
                </Box>

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
                    value={year}
                    step={1}
                    min={0}
                    max={years.length - 1}
                    onChange={(e) => setYear(parseFloat(e.target.value))}
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
                  mt: [6, '-2px', '-2px', '7px'],
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
                  mt: ['36px', '-14px', '-14px', '-14px'],
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
                  mt: ['36px', '-14px', '-14px', '-14px'],
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
        <Box sx={{ mt: [6], fontSize: [0, 0, 0, 1] }}>
          Fire perimeters from the Monitoring Trends in Burn Severity database
          (1984 through 2019) and from National Interagency Fire Center (2020
          and 2021).
        </Box>
        <Box
          sx={{ color: 'secondary', fontSize: [0, 0, 0, 1], mt: [3], mb: [0] }}
        >
          Graphics and analysis by CarbonPlan{' '}
          <Monogram
            sx={{
              color: 'primary',
              position: 'relative',
              left: '4px',
              top: '5px',
              width: 18,
            }}
          />
        </Box>
      </Box>
    </Layout>
  )
}

export default Index
