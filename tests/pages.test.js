import { toMatchImageSnapshot } from 'jest-image-snapshot'
const puppeteer = require('puppeteer')
expect.extend({ toMatchImageSnapshot })

const viewports = [
  { description: 'laptop', width: 1440, height: 1 },
  { description: 'tablet', width: 768, height: 1 },
  { description: 'mobile', width: 425, height: 1 },
]

viewports.forEach(({ description, height, width }) => {
  describe(description, () => {
    it('/', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.goto('http://localhost:3000')
      await page.waitForNetworkIdle()
      const image = await page.screenshot({ fullPage: true })

      expect(image).toMatchImageSnapshot()
    })

    it('/embed/future-risk', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.goto('http://localhost:3000/embed/future-risk')
      await page.waitForNetworkIdle()
      const image = await page.screenshot({ fullPage: true })

      expect(image).toMatchImageSnapshot()
    })

    it('/embed/project-fires', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.goto('http://localhost:3000/embed/project-fires')
      await page.waitForNetworkIdle()
      const image = await page.screenshot({ fullPage: true })

      expect(image).toMatchImageSnapshot()
    })
  })
})
