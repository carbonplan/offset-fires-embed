import base from '@carbonplan/theme'

const theme = (embed) => {
  let breakpoints
  if (embed == 'small') {
    breakpoints = ['30em', '40em', '60em']
  } else if (embed == 'medium') {
    breakpoints = ['40.063em', '80em', '80em']
  } else {
    breakpoints = ['40em', '66.875em', '90em']
  }
  return {
    ...base,
    breakpoints: breakpoints,
  }
}

export default theme
