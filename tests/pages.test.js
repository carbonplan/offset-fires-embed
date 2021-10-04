import { toMatchImageSnapshot } from 'jest-image-snapshot'
const puppeteer = require('puppeteer')
expect.extend({ toMatchImageSnapshot })

const viewports = [{ description: 'test', width: 600, height: 900 }]

viewports.forEach(({ description, height, width }) => {
  describe(description, () => {
    it('/', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.waitForNetworkIdle()
      await page.goto('http://localhost:3000')
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot()
    })

    it('/embed/future-risk', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.waitForNetworkIdle()
      await page.goto('http://localhost:3000/embed/future-risk')
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot()
    })

    it('/embed/project-fires', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.waitForNetworkIdle()
      await page.goto('http://localhost:3000/embed/project-fires')
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot()
    })
    it('/embed/project-focus', async () => {
      const browser = await puppeteer.launch()
      const page = await browser.newPage()
      await page.setViewport({ height, width })
      await page.waitForNetworkIdle()
      await page.goto('http://localhost:3000/embed/project-focus')
      const image = await page.screenshot()

      expect(image).toMatchImageSnapshot()
    })
  })
})
