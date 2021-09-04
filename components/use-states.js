import { useState, useEffect } from 'react'
import { feature } from 'topojson-client'
import { json } from 'd3-fetch'

const useStates = () => {
	const [states, setStates] = useState()

	useEffect(() => {
    const prefix =
      'https://storage.googleapis.com/carbonplan-data/raw/us-atlas/'
    const url = prefix + 'states-10m.json'
    json(url).then((us) => {
      setStates(feature(us, us.objects.states))
    })
  }, [])

  return states
}

export default useStates