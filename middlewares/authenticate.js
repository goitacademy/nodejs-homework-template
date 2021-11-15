const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const result = req.headers && req.headers.authorization
    if (!result) {
      throw new Unauthorized('Not authorized')
    }
    const [bearer, token] = result.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }
    try {
      const { id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)
      if (!user || !user.token) {
        throw new Unauthorized('Not authorized')
      }
      req.user = user
      next()
    } catch (error) {
      throw new Unauthorized(error.message)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
