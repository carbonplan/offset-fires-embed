import { useEffect } from 'react'
import useTheme from './use-theme'
import dates from './dates'

export default function Enhancers({ map, time }) {
  useTheme(map)
  return null
}
