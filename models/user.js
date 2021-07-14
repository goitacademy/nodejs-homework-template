const { model } = require('mongoose')

const { userSchema } = require('./schemas')

const User = model('user', userSchema)

module.exports = User
