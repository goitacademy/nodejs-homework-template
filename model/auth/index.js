const { signup } = require('./signup')
const { signin } = require('./signin')
const { patchUser } = require('./patchUser')

module.exports = {
  signup,
  signin,
  patchUser
}
