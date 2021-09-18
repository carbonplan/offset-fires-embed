import { useState } from 'react'
import { Box } from 'theme-ui'
import { Row, Column, formatDate } from '@carbonplan/components'
import { format } from 'd3-format'
import Project from '../../components/project'
import Layout from '../../components/layout'

const Index = () => {
  const [metadata, setMetadata] = useState(null)
  const yearStart = 0
  const yearEnd = 38
  const zoom = 'near'

  return (
    <Layout embed='small'>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          bg: 'background',
          p: [5],
          pt: [4],
        }}
      >
        <Row columns={3} sx={{ mb: [4] }}>
          <Column start={1} width={3}>
            <Box sx={{ fontSize: [5, 5, 5, 6] }}>Colville</Box>
            <Box
              sx={{ fontFamily: 'mono', letterSpacing: 'mono', fontSize: [1] }}
            >
              ACR255
            </Box>
          </Column>
        </Row>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              right: [20, 50, 50, 50],
              top: [135, 130, 130, 130],
              fontFamily: 'mono',
              color: 'red',
              letterSpacing: 'mono',
              fontSize: [1],
            }}
          >
            FIRE
            <br />
            PERIMETERS
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: [50, 105, 105, 105],
              top: [200, 240, 240, 240],
              fontFamily: 'mono',
              color: 'primary',
              letterSpacing: 'mono',
              fontSize: [1],
            }}
          >
            PROJECT
            <br />
            BOUNDARY
          </Box>
          <Project
            label={false}
            border={false}
            data={{
              id: 'ACR255',
              name: 'Colville',
              number: 3,
              centroid: [-118.63739, 48.25508],
            }}
            yearStart={yearStart}
            yearEnd={yearEnd}
            zoom={zoom}
            showStates={false}
            showStartDate={false}
            setMetadata={setMetadata}
          />
        </Box>
        <Row columns={[1, 2, 2, 2]} sx={{ mb: [0] }}>
          <Column start={1} width={1}>
            <Box
              sx={{
                textTransform: 'uppercase',
                fontFamily: 'mono',
                letterSpacing: 'mono',
                fontSize: [1],
              }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                START DATE:
              </Box>{' '}
              {metadata && formatDate(metadata?.start_date)}
            </Box>
            <Box
              sx={{ fontFamily: 'mono', letterSpacing: 'mono', fontSize: [1] }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                PROJECT AREA:
              </Box>{' '}
              {format('.2~s')(metadata?.acreage)}
            </Box>
            <Box
              sx={{ fontFamily: 'mono', letterSpacing: 'mono', fontSize: [1] }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                BUFFER CONTRIBUTION:
              </Box>{' '}
              {format('.0%')(metadata?.fire_buffer_contrib)}
            </Box>
          </Column>
          <Column start={[1, 2, 2, 2]} width={1}>
            <Box
              sx={{ fontFamily: 'mono', letterSpacing: 'mono', fontSize: [1] }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                BURN AREA:
              </Box>{' '}
              {format('.2~s')(metadata?.burned_acreage)}
            </Box>
            <Box
              sx={{ fontFamily: 'mono', letterSpacing: 'mono', fontSize: [1] }}
            >
              <Box as='span' sx={{ color: 'secondary' }}>
                BURN OVERLAP:
              </Box>{' '}
              {format('.0%')(metadata?.burned_acreage / metadata?.acreage)}
            </Box>
          </Column>
        </Row>
      </Box>
    </Layout>
  )
}

export default Index
