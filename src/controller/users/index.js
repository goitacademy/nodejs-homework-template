const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const subscription = require('./subscription')
const updateUserAvatar = require('./updateUserAvatar')
const updateCloudUserAvatar = require('./updateCloudUserAvatar')

module.exports = { signup, login, logout, current, subscription, updateUserAvatar, updateCloudUserAvatar }