import { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { scaleLinear } from 'd3-scale'
import { line } from 'd3-shape'
import { mix } from '@theme-ui/color'
import {
  Chart,
  Grid,
  AxisLabel,
  Ticks,
  TickLabels,
  Plot,
  Line,
  Point
} from '@carbonplan/charts'

const sx = {
  tick: {
    position: 'absolute',
    fontFamily: 'mono',
    letterSpacing: 'mono',
    fontSize: [1, 1, 1, 2],
    width: '30px',
    textAlign: 'right',
    color: 'secondary',
  },
  line: {
    fill: 'none',
    vectorEffect: 'non-scaling-stroke',
  },
}

const scenarios = ['historical', 'ssp245', 'ssp370', 'ssp585']
const models = [
  'ACCESS-CM2',
  'ACCESS-ESM1-5',
  'CanESM5-CanOE',
  'MIROC-ES2L',
  'MPI-ESM1-2-LR',
  'MRI-ESM2-0',
]

const colors = {
  historical: 'secondary',
  ssp245: 'teal',
  ssp370: 'yellow',
  ssp585: 'red',
}

const ProjectionTimeseries = () => {
	const [data, setData] = useState(null)

	useEffect(() => {
    const prefix = 'https://storage.googleapis.com/carbonplan-research/offset-fires/'
    const url =
      prefix + 'klamath-region-fire-projections-updated.json'
    json(url).then((d) => {
      setData(d.fire.ACR273)
    })
  }, [])

	const yticks = [0, 10, 20, 30, 40]
	const ylabel = 'risk'
	const yunits = '%'

	return (
		<Box sx={{width: '80%', height: '300px', my: [8]}}>
			<Chart x={[1980, 2090]} y={[0, 40]} padding={{ left: 55 }}>
	      <Grid horizontal values={yticks} />
	      <Grid vertical values={[1980, 2000, 2020, 2040, 2060, 2080]} />
	      <Ticks bottom />
	      <Ticks left count={4} values={yticks} />
	      <TickLabels bottom values={[2000, 2040, 2080]} />
	      <TickLabels left count={4} values={yticks} />
	      <AxisLabel left align={'left'}>
	        <span>
	          {ylabel}{' '}
	          <Box as='span' sx={{ color: 'secondary' }}>
	            {yunits}
	          </Box>
	        </span>
	      </AxisLabel>
	      <AxisLabel bottom align={'right'}>
	        Year
	      </AxisLabel>
	      <Point x={1985} y={37}>
	      	<Box sx={{fontFamily: 'mono', fontSize: [1]}}>
	      	<Box sx={{color: 'secondary'}}>HISTORICAL</Box>
	      	<Box sx={{color: 'teal'}}>SSP2-4.5</Box>
	      	<Box sx={{color: 'yellow'}}>SSP3-7.0</Box>
	      	<Box sx={{color: 'red'}}>SSP5-8.5</Box>
	      	</Box>
	      </Point>
	      {data && (
	        <Plot>
	          {scenarios.map((s) => {
	            return models.map((m) => {
	              return (
	                <Line
	                  key={m}
	                  data={data[s].models[m].map((d) => [d.y, d.r])}
	                  sx={{
	                    ...sx.line,
	                    stroke: mix(colors[s], 'background', 0.25),
	                    strokeWidth: '1px',
	                  }}
	                />
	              )
	            })
	          })}
	          {scenarios.map((s) => {
	            return (
	              <Line
	                key={s}
	                data={data[s].mean.map((d) => [d.y, d.r])}
	                sx={{ ...sx.line, stroke: colors[s], strokeWidth: '3px' }}
	              />
	            )
	          })}
	        </Plot>
	      )}
	    </Chart>
    </Box>
	)
}

export default ProjectionTimeseries