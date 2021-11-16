const { signup } = require('./signup')
const { signin } = require('./signin')
const { signout } = require('./signout')
const { patchUser } = require('./patchUser')

module.exports = {
  signup,
  signin,
  signout,
  patchUser
}
