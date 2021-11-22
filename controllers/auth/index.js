const { signoutController } = require('./signoutController')
const { signinController } = require('./signinController')
const { signupController } = require('./signupController')
const { currentController } = require('./currentController')
const { patchUserController } = require('./patchUserController')

module.exports = {
  signoutController,
  signinController,
  signupController,
  currentController,
  patchUserController
}
