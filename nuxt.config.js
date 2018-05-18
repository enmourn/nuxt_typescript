require('dotenv/config')
const path = require('path')

const envPath = path.resolve(__dirname, 'config', '.env')
require('dotenv').config({ path: envPath })

module.exports = {
  // rootDir and watcher need to docker work
  rootDir: path.resolve(__dirname),
  watchers: {
    webpack: {
      poll: true
    }
  },
  build: {
  },
  modules: [
    // ['@nuxtjs/dotenv', { path: path.resolve('config') }],
    ['@nuxtjs/dotenv', { path: envPath }],
    "@nuxtjs/axios",
    "~/modules/typescript.js"
  ],
  // axios: {}
}