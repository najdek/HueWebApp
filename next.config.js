module.exports = {
    async rewrites() {
      return [
        {
          source: '/hue-api-proxy/:ip/:path*',
          destination: 'http://:ip/api/:path*',
        },
      ]
    },
  }