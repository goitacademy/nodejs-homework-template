const { signoutController } = require('./signoutController')
const { signinController } = require('./signinController')
const { signupController } = require('./signupController')
const { currentController } = require('./currentController')
const { patchUserController } = require('./patchUserController')
const { patchAvatarController } = require('./patchAvatarController')
const { verifyUserController } = require('./verifyUserController')
const { repeatVerificationController } = require('./repeatVerificationController')

module.exports = {
  signoutController,
  signinController,
  signupController,
  currentController,
  patchUserController,
  patchAvatarController,
  verifyUserController,
  repeatVerificationController
}
