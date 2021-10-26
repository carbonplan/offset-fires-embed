import puppeteer from 'puppeteer'

const routes = [
  '/embed/offset-fires/test',
  '/embed/offset-fires/project-overlap',
  '/embed/offset-fires/future-risk',
]
const viewports = [
  { description: 'laptop', width: 1440, height: 1440 },
  { description: 'tablet', width: 768, height: 768 },
  { description: 'mobile', width: 425, height: 425 },
]

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'

routes.forEach((route) => {
  describe(route, () => {
    viewports.forEach(({ description, height, width }) => {
      it(`renders at ${description}`, async () => {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.setViewport({ height, width })
        await page.goto(baseUrl + route)
        await page.waitForNetworkIdle()
        const image = await page.screenshot({ fullPage: true })

        expect(image).toMatchImageSnapshot({
          allowSizeMismatch: true,
          customSnapshotIdentifier: `${
            route === '/embed/offset-fires/test' ? 'demo' : route
          }-${description}`,
        })
      })
    })
  })
})
