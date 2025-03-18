import { useState, useEffect, useMemo } from 'react'
import { Box, Flex } from 'theme-ui'
import {
  Slider,
  Tag,
  Row,
  Monogram,
  Link,
  Column,
} from '@carbonplan/components'
import zarr from 'zarr-js'
import { json } from 'd3-fetch'
import { geoPath, geoAlbersUsa } from 'd3-geo'
import { scaleLinear } from 'd3-scale'
import { feature } from 'topojson-client'
import Project from '../../../components/project'
import Layout from '../../../components/layout'

const projection = geoAlbersUsa().scale(1300).translate([487.5, 305])
const years = [2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090]
const scenarios = ['ssp245', 'ssp370']

const keyToScenario = {
  l: 'ssp245',
  m: 'ssp370',
}

const prefix =
  'https://storage.googleapis.com/carbonplan-research/offset-fires-embed/'

const Legend = ({ value, label }) => {
  return (
    <Box>
      <Box
        as='span'
        sx={{
          borderRadius: '5px',
          width: '10px',
          height: '10px',
          bg: 'red',
          display: 'inline-block',
          opacity: value,
        }}
      />
      <Box
        as='span'
        sx={{
          position: 'relative',
          top: '-1px',
          ml: [2],
          fontSize: [0, 0, 0, 1],
          fontFamily: 'mono',
          letterSpacing: 'mono',
          display: 'inline-block',
        }}
      >
        {label.toFixed(1)}x
      </Box>
      <Box
        as='span'
        sx={{
          position: 'relative',
          top: '-1px',
          ml: [2],
          color: 'secondary',
          fontSize: [0, 0, 0, 1],
          fontFamily: 'mono',
          letterSpacing: 'mono',
          display: 'inline-block',
        }}
      >
        increase
      </Box>
    </Box>
  )
}

const Index = () => {
  const [year, setYear] = useState(5)
  const [path, setPath] = useState()
  const [data, setData] = useState()
  const [sliderChanging, setSliderChanging] = useState(false)
  const [scenario, setScenario] = useState('l')

  useEffect(() => {
    const uri = prefix + 'relative_fire_risk_v3.zarr'
    zarr().loadGroup(
      uri,
      (err, res) => {
        setData(res)
      },
      ['ssp245', 'ssp370', 'ssp585', 'lat', 'lon'],
    )
  }, [])

  useEffect(() => {
    const url = prefix + 'conus-albers-simplified.json'
    json(url).then((us) => {
      setPath(geoPath()(feature(us, us.objects.states)))
    })
  }, [])

  const values = useMemo(() => {
    if (!data) return null
    const out = {}
    let coords
    scenarios.forEach((s) => {
      out[s] = {}
      for (let k = 0; k < years.length; k++) {
        out[s][k] = []
        if (s === scenarios[0] && k === 0) {
          coords = []
        }
        for (let i = 0; i < 65; i++) {
          for (let j = 0; j < 100; j++) {
            const val = data[s].get(k, i, j)
            if (!Number.isNaN(val)) {
              out[s][k].push(val)
              if (s === scenarios[0] && k === 0) {
                coords.push(
                  projection([data['lon'].get(i, j), data['lat'].get(i, j)]),
                )
              }
            }
          }
        }
      }
    })

    out.coords = coords
    return out
  }, [data])

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
        <Box
          sx={{
            fontFamily: 'heading',
            lineHeight: 'heading',
            fontSize: [4, 5, 5, 5],
          }}
        >
          Future increases in fire risk
        </Box>
        <Box
          sx={{
            fontFamily: 'body',
            fontSize: [1, 1, 1, 2],
            lineHeight: 'body',
            pt: [3],
            pb: [5],
          }}
        >
          Below, we show future fire risk relative to some of the United States’
          historically highest-risk forests. By the end of the 21st century,
          even under a low-emissions scenario (SSP2-4.5), risks to forests in
          much of the Western US are projected to increase by 500 percent
          compared to the current risk in California.*
        </Box>

        <Row columns={[6]}>
          <Column start={[1]} width={[3, 4, 4, 4]}>
            <Box
              sx={{
                fontFamily: 'heading',
                fontSize: [1, 2, 2, 3],
                letterSpacing: 'smallcaps',
                textTransform: 'uppercase',
                mb: [2],
              }}
            >
              Emissions scenario
            </Box>
            <Tag
              sx={{ fontSize: [0, 1, 1, 2], mr: [2, 3, 3, 3] }}
              value={scenario === 'l'}
              onClick={() => setScenario('l')}
            >
              SSP2-4.5
            </Tag>
            <Tag
              sx={{ fontSize: [0, 1, 1, 2], mr: [2, 3, 3, 3] }}
              value={scenario === 'm'}
              onClick={() => setScenario('m')}
            >
              SSP3-7.0
            </Tag>
          </Column>
          <Column
            start={[4, 5, 5, 5]}
            width={[3, 2, 2, 2]}
            sx={{ mt: ['-3px'] }}
          >
            <Legend value={1 / 5} label={1} />
            <Legend value={2.5 / 5} label={2.5} />
            <Legend value={5 / 5} label={5} />
          </Column>
        </Row>
        <Box
          sx={{
            mt: [3, 3, 3, 4],
            position: 'relative',
            width: '100%',
          }}
        >
          <Box>
            <svg viewBox='0 0 980 610'>
              {values &&
                values.coords.map((d, i) => {
                  return (
                    <g
                      key={i}
                      transform={`translate(${values.coords[i][0]},${values.coords[i][1]})`}
                    >
                      <circle
                        r='4'
                        fill='#f07071'
                        fillOpacity={
                          values[keyToScenario[scenario]][year][i] / 5
                        }
                      />
                    </g>
                  )
                })}
              <Box
                as='g'
                sx={{ opacity: 0.5, fill: 'none', stroke: 'primary' }}
                strokeLinejoin='round'
                strokeLinecap='round'
                strokeWidth='1'
              >
                <path d={path}></path>
              </Box>
            </svg>
          </Box>
        </Box>
        <Flex sx={{ mt: [2], mb: [2], pr: [2] }}>
          <Box
            sx={{
              textTransform: 'uppercase',
              fontFamily: 'heading',
              letterSpacing: 'smallcaps',
              mt: '-2px',
              pr: [5],
            }}
          >
            Year
          </Box>
          <Box sx={{ position: 'relative', width: '100%', mt: [2] }}>
            <Box
              as='span'
              sx={{
                mt: ['-24px'],
                fontSize: [1, 1, 1, 2],
                fontFamily: 'mono',
                color: 'red',
                position: 'absolute',
                transform: 'translateX(-50%)',
                letterSpacing: 'mono',
                left: [`${year * (97 / (years.length - 1)) + 1.5}%`],
                opacity: sliderChanging ? 1 : 0,
                transition: 'opacity 0.25s',
              }}
            >
              {year * 10 + 2020}
            </Box>
            <Slider
              sx={{
                color: 'red',
              }}
              value={year}
              step={1}
              min={0}
              max={years.length - 1}
              onChange={(e) => setYear(parseFloat(e.target.value))}
              onTouchStart={() => {
                setSliderChanging(true)
              }}
              onTouchEnd={() => {
                setSliderChanging(false)
              }}
              onMouseDown={() => {
                setSliderChanging(true)
              }}
              onMouseUp={() => {
                setSliderChanging(false)
              }}
              onKeyDown={() => {
                setSliderChanging(true)
              }}
              onKeyUp={() => setSliderChanging(false)}
            />
            <Box sx={{ mt: [3] }}>
              {years.map((d, i) => {
                return (
                  <Box
                    key={i}
                    as='span'
                    sx={{
                      color: 'secondary',
                      fontFamily: 'mono',
                      letterSpacing: 'mono',
                      fontSize: [1, 1, 1, 2],
                      position: 'absolute',
                      top: '24px',
                      display: [
                        i % 2 == 0 ? 'inline-block' : 'none',
                        'inline-block',
                        'inline-block',
                        'inline-block',
                      ],
                      transform: 'translateX(-50%)',
                      left: [`${i * (97 / (years.length - 1)) + 1.5}%`],
                    }}
                  >
                    {d}
                  </Box>
                )
              })}
            </Box>
          </Box>
        </Flex>
        <Box sx={{ mt: [6], fontSize: [0, 0, 0, 1] }}>
          * We define a baseline as the 97th percentile of risk across U.S.
          forests from 1990 to 2019, which is roughly equivalent to the risk in
          California — a notably high-risk region — over that same time period.
        </Box>
        <Box
          sx={{ color: 'secondary', fontSize: [0, 0, 0, 1], mt: [3], mb: [0] }}
        >
          Graphics and analysis by CarbonPlan{' '}
          <Monogram
            sx={{
              color: 'primary',
              position: 'relative',
              left: '4px',
              top: '5px',
              width: 18,
            }}
          />
        </Box>
      </Box>
    </Layout>
  )
}

export default Index
