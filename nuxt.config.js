const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  watchers: {
    webpack: {
      poll: true
    }
  }
}