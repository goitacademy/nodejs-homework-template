const controllerWrapper = require('./controllersWrapper')
const validation = require('./validation')
const authenticate = require('./authenticate')
const upload = require('./upload')

module.exports = {
  controllerWrapper,
  validation,
  authenticate,
  upload
}
