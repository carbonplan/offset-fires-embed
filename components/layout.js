import Head from 'next/head'
import { ThemeProvider } from 'theme-ui'
import theme from '../theme'

const Layout = ({ children, embed }) => {
  return (
    <>
      <Head>
        <script
          type='text/javascript'
          src='/embed/offset-fires/iframeResizer.contentWindow.min.js'
        />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <ThemeProvider theme={theme(embed)}>{children}</ThemeProvider>
    </>
  )
}

export default Layout
