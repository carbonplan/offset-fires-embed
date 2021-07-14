import { Box, Themed } from 'theme-ui'
import { Layout, Row, Column } from '@carbonplan/components'
import FireMap from '../components/fire-map'
import ProjectionTimeseries from '../components/projection-timeseries'

const Index = () => {
	return (
		<Layout>
			<Row>
			<Column start={[1, 3, 3, 3]} width={[6, 6, 6, 6]}>
			<Themed.h1>Offset fires</Themed.h1>
			<FireMap/>
			<ProjectionTimeseries/>
			</Column>
			</Row>
		</Layout>
	)
}

export default Index