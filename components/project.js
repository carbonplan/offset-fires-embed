import { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const Project = ({ data, year }) => {

	const [projectPath, setProjectPath] = useState(null)
	const [firePaths, setFirePaths] = useState({})

	const { number, id, name } = data

	useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-research/offset-fires/grist/projects/'
    const url = prefix + `${id}/shape.json`
    
    json(url).then((data) => {
    	const projection = geoAlbersUsa().fitExtent([[0, 0], [400, 200]], data.features[0].geometry)
      setProjectPath(geoPath().projection(projection)(data.features[0].geometry))
      const fireUrl = prefix + `ACR273/fires.json`
      json(fireUrl).then((fireData) => {
      	const firePathsTmp = {}
      	Array(23).fill(0).map((d,i) => {
      		firePathsTmp[i] = geoPath().projection(projection)(fireData.features[i].geometry)
      	})
      	setFirePaths(firePathsTmp)
      })
    })
  }, [])


  return (
  	<>
  	<Box sx={{pb: [2]}}>
  	<Box as='span' sx={{color: 'secondary', fontFamily: 'mono', letterSpacing: 'mono'}}>{number}</Box>
  	<Box as='span' sx={{pl: [2], fontSize: [4, 4, 4, 5]}}>{name}</Box>
  	</Box>
  	<Box sx={{p: [3], mb: [4], border: ({colors}) => `solid 1px ${colors.muted}`}}>
  	<Box as='svg' viewBox='0 0 400 200' >
  		<g strokeLinejoin='round' strokeLinecap='round'>
  		<Box as='path' sx={{stroke: 'none', fill: 'primary'}} d={projectPath}></Box>
  		{
  			Array(year).fill(0).map((d,i) => {
  				return <Box key={i} as='path' sx={{stroke: 'none', fill: 'red'}} d={firePaths[i]}></Box>
  			})
  		}
  		</g>
  	</Box>
  	</Box>
  	</>
  )
}

export default Project