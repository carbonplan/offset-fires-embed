import { Box } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import Project from '../../components/project'

const Index = () => {
  const year = 38
  const zoom = 'near'
  return (
    <Box
      sx={{ width: '100%', height: '100%', bg: 'background', p: [5], pt: [4] }}
    >
      <Row columns={3} sx={{ mb: [4] }}>
        <Column start={1} width={3}>
          <Box sx={{ fontSize: [5, 5, 5, 6] }}>Colville</Box>
          <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>ACR255</Box>
        </Column>
      </Row>
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            position: 'absolute',
            right: 30,
            top: 130,
            fontFamily: 'mono',
            color: 'red',
            letterSpacing: 'mono',
          }}
        >
          FIRE
          <br />
          PERIMETERS
        </Box>
        <Box
          sx={{
            position: 'absolute',
            right: 90,
            top: 250,
            fontFamily: 'mono',
            color: 'primary',
            letterSpacing: 'mono',
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
          year={year}
          zoom={zoom}
        />
      </Box>
      <Row columns={2} sx={{ mb: [2] }}>
        <Column start={1} width={1}>
          <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>
            PROJECT AREA: XX
          </Box>
          <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>
            TOTAL CREDITS: XX
          </Box>
        </Column>
        <Column start={2} width={1}>
          <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>
            BURN AREA: XX
          </Box>
          <Box sx={{ fontFamily: 'mono', letterSpacing: 'mono' }}>
            BURN OVERLAP: XX
          </Box>
        </Column>
      </Row>
    </Box>
  )
}

export default Index
