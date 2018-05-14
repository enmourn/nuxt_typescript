const path = require('path')

module.exports = {
  // rootDir and watcher need to docker work
  rootDir: path.resolve(__dirname),
  watchers: {
    webpack: {
      poll: true
    }
  },
  modules: [
    "~/modules/typescript.js"
  ]
}