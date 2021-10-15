const { loginController } = require('./loginController')
const { register } = require('./register')
const { logoutController } = require('./logoutController')
const { userInfoController } = require('./userInfoController')

module.exports = {
  loginController,
  register,
  logoutController,
  userInfoController
}
