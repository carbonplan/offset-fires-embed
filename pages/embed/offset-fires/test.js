import { useEffect, useCallback } from 'react'
import { Box, Themed } from 'theme-ui'
import { Row, Column } from '@carbonplan/components'
import Layout from '../../../components/layout'

const Index = () => {
  useEffect(() => {
    window.onresize = () => {
      const figure1 = document.getElementById('figure-1')
      figure1.height =
        figure1.contentWindow.document.body.offsetHeight + 1 + 'px'
      const figure3 = document.getElementById('figure-3')
      figure3.height =
        figure3.contentWindow.document.body.offsetHeight + 1 + 'px'
    }
  }, [])

  return (
    <Layout>
      <Box sx={{ mx: 'auto', maxWidth: '1680px' }}>
        <Box sx={{ mx: '3vw' }}>
          <Box
            sx={{
              color: '#3c3830',
              ml: [3, 0, 0, 'calc(300px + 3vw)'],
              mr: [3, 0, 'calc(300px + 3vw)', 'calc(300px + 3vw)'],
            }}
          >
            <Box>
              <Box
                sx={{
                  textAlign: 'center',
                  fontSize: [8, 8, 8, 9],
                  my: [5, 6, 7, 8],
                  lineHeight: 1.1,
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                This is a heading
              </Box>
              <Box sx={{ lineHeight: 1.4 }}>
                <Box
                  sx={{
                    fontSize: ['20px'],
                    my: [2, 3, 4, 5],
                    maxWidth: '600px',
                    mx: 'auto',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Box>
                <Box
                  as='iframe'
                  id='figure-1'
                  height='1001px'
                  scrolling='no'
                  onLoad={(event) => {
                    const iframe = event.target
                    iframe.height =
                      iframe.contentWindow.document.body.offsetHeight + 1 + 'px'
                  }}
                  src='/embed/offset-fires/project-overlap'
                  sx={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '650px',
                    mx: 'auto',
                    my: [7],
                    border: 'none',
                  }}
                />
                <Box
                  sx={{
                    fontSize: ['20px'],
                    my: [2, 3, 4, 5],
                    maxWidth: '600px',
                    mx: 'auto',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Box>
                <Box
                  sx={{
                    fontSize: ['20px'],
                    my: [2, 3, 4, 5],
                    maxWidth: '600px',
                    mx: 'auto',
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Box>
                <Box
                  as='iframe'
                  id='figure-3'
                  src='/embed/offset-fires/future-risk'
                  scrolling='no'
                  height='750px'
                  onLoad={(event) => {
                    const iframe = event.target
                    iframe.height =
                      iframe.contentWindow.document.body.offsetHeight + 1 + 'px'
                  }}
                  sx={{
                    display: 'block',
                    width: '100%',
                    maxWidth: '650px',
                    mx: 'auto',
                    my: [7],
                    border: 'none',
                  }}
                />
                <Box
                  sx={{
                    fontSize: ['20px'],
                    my: [2, 3, 4, 5],
                    maxWidth: '600px',
                    mx: 'auto',
                    pb: [7],
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default Index
