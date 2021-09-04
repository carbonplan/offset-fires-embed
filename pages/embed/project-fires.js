import { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { Row, Column, Slider } from '@carbonplan/components'
import Minimap from '../../components/minimap'
import Project from '../../components/project'

const projects = [
  {
    id: 'ACR273',
    name: 'Klamath East',
    number: 1,
    centroid: [-121.22172, 42.72968],
  },
  {
    id: 'ACR274',
    name: 'Klamath West',
    number: 2,
    centroid: [-122.11735, 42.16019],
  },
  {
    id: 'ACR255',
    name: 'Colville',
    number: 3,
    centroid: [-118.63739, 48.25508],
  },
  {
    id: 'ACR260',
    name: 'Warm Springs',
    number: 4,
    centroid: [-121.6897, 44.75978],
  },
  {
    id: 'CAR1174',
    name: 'Eddie Ranch',
    number: 5,
    centroid: [-123.09825, 39.37204],
  },
  {
    id: 'CAR1046',
    name: 'Trinity',
    number: 6,
    centroid: [-123.49326, 40.55713],
  },
]

const years = Array(38)
  .fill(0)
  .map((d, i) => i + 1984)

const Index = () => {
  const [year, setYear] = useState(5)
  const [zoom, setZoom] = useState('near')

  return (
    <Box sx={{ width: '100%', height: '100%', bg: 'background', p: [5] }}>
      <Row columns={[2, 3, 3, 3]} sx={{ mb: [3] }}>
        <Column start={1} width={[2, 2, 2, 2]}>
          <Box
            sx={{
              fontFamily: 'heading',
              lineHeight: 'heading',
              fontSize: [4, 5, 6, 7],
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
            Here we show the overlap between forest offset projects in
            California, Oregon, and Washington and historical fires. Fire
            perimeters are from the MTBS database (1984 through 2018) and from
            NIFC (2019 and 2020, in progress). Fires are shown for all years up
            to and including the year selected using the slider at the bottom.
            You can use the plus and minus to zoom in and out and help orient
            the location of each project.
          </Box>
        </Column>
        <Column start={[1, 3, 3, 3]} width={[2, 1, 1, 1]}>
          <Minimap data={projects} />
        </Column>
      </Row>
      <Row columns={[2, 3, 3, 3]}>
        <Column start={1} width={1}>
          <Project data={projects[0]} year={year} zoom={zoom} />
        </Column>
        <Column start={2} width={1}>
          <Project data={projects[1]} year={year} zoom={zoom} />
        </Column>
        <Column start={[1, 3, 3, 3]} width={1}>
          <Project data={projects[2]} year={year} zoom={zoom} />
        </Column>
        <Column start={[2, 1, 1, 1]} width={1}>
          <Project data={projects[3]} year={year} zoom={zoom} />
        </Column>
        <Column start={[1, 2, 2, 2]} width={1}>
          <Project data={projects[4]} year={year} zoom={zoom} />
        </Column>
        <Column start={[2, 3, 3, 3]} width={1}>
          <Project data={projects[5]} year={year} zoom={zoom} />
        </Column>
      </Row>
      <Row columns={[2, 3, 3, 3]} sx={{ mt: [3], mb: [3] }}>
        <Column start={1} width={2}>
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
              <Slider
                sx={{ color: 'red' }}
                value={year}
                step={1}
                min={0}
                max={years.length - 1}
                onChange={(e) => setYear(parseFloat(e.target.value))}
              />
              <Box sx={{ mt: [3] }}>
                {years.map((d, i) => {
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
                          display: 'inline-block',
                          transform: 'translateX(-50%)',
                          left: `${i * (97 / (years.length - 1)) + 1.5}%`,
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
        <Column start={3} width={1}>
          <Flex sx={{ justifyContent: 'flex-end' }}>
            <Box
              sx={{
                textTransform: 'uppercase',
                fontFamily: 'heading',
                letterSpacing: 'smallcaps',
                mt: '-2px',
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
                mt: '-14px',
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
                mt: '-14px',
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
  )
}

export default Index
