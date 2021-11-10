const { registerUser } = require('./registerUser')
const { loginUser } = require('./loginUser')
const { logoutUser } = require('./logoutUser')
const { getCurrent } = require('./getCurrent')

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrent
}
