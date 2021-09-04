import { Box, Themed } from 'theme-ui'
import { Layout, Row, Column } from '@carbonplan/components'

const Index = () => {
  return (
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Box>
              <Box
                sx={{
                  fontSize: ['20px'],
                  my: [2, 3, 4, 5],
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Box>
              <Box
                as='iframe'
                src='/embed/project-fires'
                sx={{
                  display: 'block',
                  width: ['100%', '100%', '100%', '1024px'],
                  maxWidth: '1024px',
                  mr: [0, 'auto', 0, 0],
                  ml: [0, 'auto', 0, 'calc(-300px - 3vw)'],
                  border: 'none',
                  height: ['1090px', '800px', '800px', '800px'],
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Box>
              <Box
                as='iframe'
                src='/embed/project-focus'
                sx={{
                  display: 'block',
                  width: '100%',
                  maxWidth: '600px',
                  mx: 'auto',
                  border: 'none',
                  height: ['420px', '500px', '500px', '500px'],
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Index
