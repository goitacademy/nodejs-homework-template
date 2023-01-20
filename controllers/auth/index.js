const register = require('./register')
const login = require('./login')
const getCurrent = require('./getCurrent')
const logout = require('./logout');
const updateSubscription = require('./updateSubscription')
const updateAvatare = require('./updateAvatare')

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatare,
}