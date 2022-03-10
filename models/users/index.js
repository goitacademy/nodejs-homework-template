const joi = require('./validationSchema')
const User = require('./model')

module.exports = {User, ...joi}