require('esbuild-register')

const config = require('./config/index.ts')
module.exports = {
  ...config.default,
  title: '项目文档'
}
