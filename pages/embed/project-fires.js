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
          Minimap
        </Column>
      </Row>
      <Row columns={3}>
        <Column start={1} width={1}>
          Project
        </Column>
        <Column start={2} width={1}>
          Project
        </Column>
        <Column start={3} width={1}>
          Project
        </Column>
      </Row>
      <Row columns={3}>
        <Column start={1} width={1}>
          Project
        </Column>
        <Column start={2} width={1}>
          Project
        </Column>
        <Column start={3} width={1}>
          Project
        </Column>
      </Row>
    </Box>
  )
}

export default Index
