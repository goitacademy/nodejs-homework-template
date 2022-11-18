const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const patchSub = require('./patchSub')
const patchAvatar = require('./patchAvatar')

module.exports = {
    register,
    login,
    logout,
    current,
    patchSub,
    patchAvatar
}