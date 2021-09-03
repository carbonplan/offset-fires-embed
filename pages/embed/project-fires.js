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
  },
  {
    id: 'ACR274',
    name: 'Klamath West',
    number: 2,
  },
  {
    id: 'ACR255',
    name: 'Colville',
    number: 3,
  },
  {
    id: 'ACR260',
    name: 'Warm Springs',
    number: 4,
  },
  {
    id: 'CAR1174',
    name: 'Eddie Ranch',
    number: 5,
  },
  {
    id: 'CAR1046',
    name: 'Trinity',
    number: 6,
  },
]

const Index = () => {
  const [year, setYear] = useState(5)

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Box>
        </Column>
        <Column start={[1, 3, 3, 3]} width={[2, 1, 1, 1]}>
          <Minimap />
        </Column>
      </Row>
      <Row columns={[2, 3, 3, 3]}>
        <Column start={1} width={1}>
          <Project data={projects[0]} year={year} />
        </Column>
        <Column start={2} width={1}>
          <Project data={projects[1]} year={year} />
        </Column>
        <Column start={[1, 3, 3, 3]} width={1}>
          <Project data={projects[2]} year={year} />
        </Column>
        <Column start={[2, 1, 1, 1]} width={1}>
          <Project data={projects[3]} year={year} />
        </Column>
        <Column start={[1, 2, 2, 2]} width={1}>
          <Project data={projects[4]} year={year} />
        </Column>
        <Column start={[2, 3, 3, 3]} width={1}>
          <Project data={projects[5]} year={year} />
        </Column>
      </Row>
      <Row columns={[2, 3, 3, 3]} sx={{ mt: [3] }}>
        <Column start={1} width={2}>
          <Flex>
            <Box
              sx={{
                textTransform: 'uppercase',
                fontFamily: 'heading',
                letterSpacing: 'smallcaps',
                mt: '-2px',
                pr: [3],
              }}
            >
              Year
            </Box>
            <Slider
              sx={{ color: 'red' }}
              value={year}
              step={1}
              min={0}
              max={23}
              onChange={(e) => setYear(parseFloat(e.target.value))}
            />
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
              }}
            >
              Zoom
            </Box>
            <Box
              sx={{
                textTransform: 'uppercase',
                fontFamily: 'body',
                letterSpacing: 'smallcaps',
                mt: '-16px',
                pl: [3],
                fontSize: [5, 5, 5, 6],
              }}
            >
              -
            </Box>
            <Box
              sx={{
                textTransform: 'uppercase',
                fontFamily: 'body',
                letterSpacing: 'smallcaps',
                mt: '-16px',
                pl: [3],
                fontSize: [5, 5, 5, 6],
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
