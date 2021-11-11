const { registerUser } = require('./registerUser')
const { loginUser } = require('./loginUser')
const { logoutUser } = require('./logoutUser')
const { getCurrent } = require('./getCurrent')
const { patchUserSub } = require('./patchUserSub')

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrent,
  patchUserSub
}
