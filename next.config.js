const isDev =
  process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development'

module.exports = {
  pageExtensions: ['jsx', 'js', 'md', 'mdx'],
  assetPrefix: isDev ? '' : 'https://offset-fires-embed.carbonplan.org',
}
