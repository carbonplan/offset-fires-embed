<img
  src='https://carbonplan-assets.s3.amazonaws.com/monogram/dark-small.png'
  height='48'
/>

# carbonplan / offset-fires-embed

**visualizing and analyzing fires in forest offset projects**

[![GitHub][github-badge]][github]
![MIT License][]
![GitHub deployments](https://img.shields.io/github/deployments/carbonplan/offset-fires-embed/production?label=vercel&logo=vercel&logoColor=white)
[![Build Status]][actions]

[github]: https://github.com/carbonplan/offset-fires-embed
[github-badge]: https://badgen.net/badge/-/github?icon=github&label
[build status]: https://github.com/carbonplan/offset-fires-embed/actions/workflows/main.yml/badge.svg
[actions]: https://github.com/carbonplan/offset-fires-embed/actions/workflows/main.yml
[mit license]: https://badgen.net/badge/license/MIT/blue

Note: the graphics included in this project are being used in production. We do not anticipate substantive changes to this project going forward.

## to build the site locally

Assuming you already have `Node.js` installed, you can install the build dependencies with:

```shell
npm install .
```

To start a development version of the site, simply run:

```shell
npm run dev
```

and then visit `http://localhost:3000/embed/offset-fires/test` in your browser.

The embeddable pages, referenced in the test page, can be found at:

- embed/offset-fires/project-overlap
- embed/offset-fires/future-risk

## license

All the code in this repository is [MIT](https://choosealicense.com/licenses/mit/) licensed. When possible, the data used by this project is licensed using the [CC-BY-4.0](https://choosealicense.com/licenses/cc-by-4.0/) license. We include attribution and additional license information for third party datasets, and we request that you also maintain that attribution if using this data.

## about us

CarbonPlan is a non-profit organization that uses data and science for climate action. We aim to improve the transparency and scientific integrity of carbon removal and climate solutions through open data and tools. Find out more at [carbonplan.org](https://carbonplan.org/) or get in touch by [opening an issue](https://github.com/carbonplan/offset-fires-embed/issues/new) or [sending us an email](mailto:hello@carbonplan.org).
