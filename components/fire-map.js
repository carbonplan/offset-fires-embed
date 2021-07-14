import { useThemeUI, Box, Text, Grid, Button, Divider } from 'theme-ui'
import { useState, useEffect, useRef } from 'react'
import { Slider } from '@carbonplan/components'
import mapboxgl from 'mapbox-gl'
import style from './style'
import dates from './dates'
import Enhancers from './enhancers'

const FireMap = () => {
  const container = useRef(null)
  const [map, setMap] = useState(null)
  const [time, setTime] = useState(36)
  const [centerZoomIn, setCenterZoomIn] = useState([])
  const [centerZoomOut, setCenterZoomOut] = useState([])

  const {
    theme: { rawColors: colors },
  } = useThemeUI()

  const zoomOut = () => {
    map.flyTo({
      center: centerZoomOut,
      zoom: 7.5671898972915885,
      essential: true,
    })
  }

  const zoomIn = () => {
    map.flyTo({
      center: centerZoomIn,
      zoom: 9,
      essential: true,
    })
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log('hi')
  //     if (map) zoomIn()
  //     setTimeout(() => {
  //       if (map) zoomOut()
  //     }, 2500)
  //   }, 6000)
  // }, [map])

  useEffect(() => {
    const filter = ['!=', 'NAME', 'Corvallis']

    let centerZoomOut = [-121.23942315702305, 42.68700925593174]
    let centerZoomIn = [-121.12848897188206, 42.68166705323543]

    if (window.matchMedia('(min-width: 640px)').matches) {
    } else {
      // different center on small screens
      centerZoomOut = [-121.58549497082685, 45.12433103370327]
      centerZoomIn = [-121.65406393004127, 44.751312650390256]
    }

    const map = new mapboxgl.Map({
      container: container.current,
      style: style,
      center: centerZoomOut,
      zoom: 7.5671898972915885,
      minZoom: 3,
      maxZoom: 9,
      maxBounds: [
        [-155, 5],
        [-45, 65],
      ],
    })

    setCenterZoomOut(centerZoomOut)
    setCenterZoomIn(centerZoomIn)

    //map.scrollZoom.disable()
    //map.dragPan.disable()
    map.dragRotate.disable()
    map.boxZoom.disable()
    map.doubleClickZoom.disable()

    map.on('load', () => {
      setMap(map)
      map.setFilter('places-text', filter)
      map.setFilter('places-points', filter)
    })

    // map.on('move', () => {
    //   console.log(map.getCenter())
    //   console.log(map.getZoom())
    // })

    return function cleanup() {
      setMap(null)
      map.remove()
    }
  }, [])

  return (
    <Box
      as='figure'
      sx={{
        mt: [6, 6, 6, 7],
        mb: [4, 4, 4, 5],
        position: 'relative',
      }}
    >
      <Divider />
      <Box
        ref={container}
        sx={{
          width: '100%',
          height: '500px',
          'canvas.mapboxgl-canvas:focus': {
            outline: 'none',
          },
          'canvas.mapboxgl-canvas': {
            cursor: 'default',
          },
        }}
      >
        {map && <Enhancers map={map} time={time} />}
      </Box>
      <Divider sx={{ mt: ['18px'], mb: [1] }} />
      <Grid
        gap={['0px']}
        columns={[
          '150px 1fr 60px 30px 40px',
          '150px 1fr 60px 30px 40px',
          '150px 1fr 60px 30px 40px',
        ]}
      >
        <Box
          sx={{
            pl: [1],
            pt: [2],
            fontSize: [2, 2, 2, 3],
            fontFamily: 'heading',
            letterSpacing: 'smallcaps',
          }}
        >
          JUL 13 2021
        </Box>
        <Box/>
        <Box
          sx={{
            fontSize: [2, 2, 2, 3],
            fontFamily: 'heading',
            letterSpacing: 'smallcaps',
            pl: [1],
            pt: [2],
          }}
        >
          ZOOM
        </Box>
        <Box
          onClick={zoomOut}
          sx={{
            mt: ['-4px'],
            background: 'none',
            fontSize: [5],
            pl: [2],
            cursor: 'pointer',
            color: 'secondary',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                color: 'primary',
              },
            },
            transition: '0.2s',
          }}
        >
          –
        </Box>
        <Box
          onClick={zoomIn}
          sx={{
            mt: ['-4px'],
            background: 'none',
            fontSize: [5],
            pl: [2],
            cursor: 'pointer',
            color: 'secondary',
            '@media (hover: hover) and (pointer: fine)': {
              '&:hover': {
                color: 'primary',
              },
            },
            transition: '0.2s',
          }}
        >
          +
        </Box>
      </Grid>
      <Divider sx={{ mt: ['2px'] }} />
    </Box>
  )
}

export default FireMap
