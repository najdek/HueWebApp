module.exports = {
    async rewrites() {
      return [
        {
          source: '/hue-api-proxy/:ip/:path*',
          destination: 'http://:ip/api/:path*',
        },
        {
            source: '/hue-setup-proxy/:ip',
            destination: 'http://:ip/api',
        }
      ]
    },
    reactStrictMode: false,
    typescript: {
        // !!! REMOVE THIS LATER !!!
        ignoreBuildErrors: true
    }
  }