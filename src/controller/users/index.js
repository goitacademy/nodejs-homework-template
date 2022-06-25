const signup = require('./signup')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const subscription = require('./subscription')
const updateUserAvatar = require('./updateUserAvatar')
const updateCloudUserAvatar = require('./updateCloudUserAvatar')
const verifyUser = require('./verifyUser')
const verifyUserOneMoreTime = require('./verifyUserOneMoreTime')


module.exports = { signup, login, logout, current, subscription, 
updateUserAvatar, updateCloudUserAvatar, verifyUser, verifyUserOneMoreTime, }