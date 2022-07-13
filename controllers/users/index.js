const signup = require('./signup.js')
const login = require('./login')
const logout = require('./logout')

const getCurrent = require('./getCurrent')
const updateAvatar = require('./updateAvatar')


module.exports = {
    signup,
    login,
    logout,
    getCurrent,
    updateAvatar,
}