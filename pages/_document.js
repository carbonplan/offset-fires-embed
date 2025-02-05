import Document, { Html, Main, NextScript, Head } from 'next/document'
import { InitializeColorMode } from 'theme-ui'

class MyDocument extends Document {
  render() {
    return (
      <Html
        lang='en'
        style={{ backgroundColor: 'rgb(240, 240, 240)' }}
        className='no-focus-outline'
      >
        <Head>
          <script
            defer
            data-domain='carbonplan.org'
            src='https://plausible.io/js/script.js'
          />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
