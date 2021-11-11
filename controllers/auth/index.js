const authRegister = require('./authRegister')
const authLogin = require('./authLogin')
const authLogout = require('./authLogout')
const authCurrent = require('./authCurrent')
const authPatchSub = require('./authPatchSub')

module.exports = {
  authRegister,
  authLogin,
  authLogout,
  authCurrent,
  authPatchSub
}
