import { toMatchImageSnapshot } from 'jest-image-snapshot'
const puppeteer = require('puppeteer')
expect.extend({ toMatchImageSnapshot })

const options = {
  allowSizeMismatch: true,
}
const viewports = [
  { description: 'laptop', width: 1440, height: 1440 },
  { description: 'tablet', width: 768, height: 768 },
  { description: 'mobile', width: 425, height: 425 },
]

const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:3000'

viewports.forEach(({ description, height, width }) => {
  describe(description, () => {
    it('/', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.goto(baseUrl + '/')
      await page.waitForNetworkIdle()
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot(options)
    })

    it('/embed/future-risk', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.goto(baseUrl + '/embed/future-risk')
      await page.waitForNetworkIdle()
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot(options)
    })

    it('/embed/project-fires', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.goto(baseUrl + '/embed/project-fires')
      await page.waitForNetworkIdle()
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot(options)
    })
  })
})
