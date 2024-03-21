module.exports = {
    async rewrites() {
      return [
        {
          source: '/hue-api-proxy/:ip/:path*',
          destination: 'http://:ip/api/:path*',
        },
        {
          source: '/hue-api-proxy-ssl/:ip/:path*',
          destination: 'https://:ip/api/:path*',
        }
      ]
    },
    reactStrictMode: false
  }