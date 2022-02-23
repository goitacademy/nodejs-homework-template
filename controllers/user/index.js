const signUp = require('./signUp');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const avatars = require('./avatars');
const verify = require('./verify');
const reVerify = require('./reVerify')

module.exports = {
    signUp,
    login,
    logout,
    current,
    avatars,
    verify,
    reVerify
}
