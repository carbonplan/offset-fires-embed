import React from 'react'
import Script from 'next/script'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@carbonplan/components/globals.css'
import '@carbonplan/components/fonts.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' && (
        <Script
          strategy='lazyOnload'
          data-domain='carbonplan.org'
          data-api='https://carbonplan.org/proxy/api/event'
          src='https://carbonplan.org/js/script.file-downloads.outbound-links.js'
        />
      )}
    </>
  )
}
