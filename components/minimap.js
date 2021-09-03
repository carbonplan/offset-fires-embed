import { useState, useEffect } from 'react'
import { Box } from 'theme-ui'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { feature } from 'topojson-client'

const Minimap = () => {

	const [path, setPath] = useState(null)
	const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])

	useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/'
    const url = prefix + 'conus-albers-simplified.json'
    json(url).then((us) => {
      setPath(geoPath()(feature(us, us.objects.states)))
    })
  }, [])

  return (
  	<Box sx={{pl: [8]}}>
  	 	<Box as='svg' viewBox='0 0 975 610' sx={{stroke: 'primary', fill: 'none'}}>
        <g strokeLinejoin='round' strokeLinecap='round' strokeWidth='2'>
          <path d={path}></path>
        </g>
      </Box>
    </Box>
  )
}

export default Minimap