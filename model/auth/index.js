const { registerUser } = require('./registerUser')
const { loginUser } = require('./loginUser')
const { logoutUser } = require('./logoutUser')
const { getCurrent } = require('./getCurrent')
const { patchUserSub } = require('./patchUserSub')
const { patchUserAvatar } = require('./patchUserAvatar')

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrent,
  patchUserSub,
  patchUserAvatar
}
