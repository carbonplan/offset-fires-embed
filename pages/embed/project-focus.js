import { Box } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'

const Index = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', bg: 'background' }}>
      <Row columns={3}>
        <Column start={1} width={2}>
          Title
        </Column>
        <Column start={3} width={1}>
          Stats
        </Column>
      </Row>
      <Box>Project</Box>
    </Box>
  )
}

export default Index
