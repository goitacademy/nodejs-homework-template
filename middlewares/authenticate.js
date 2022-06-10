const { User } = require('../model/user')
const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('You are not authorized')
    }

    const [bearer, token] = req.headers.authorization.split(' ')

    if (bearer !== 'Bearer') {
      next(new Unauthorized('Not authorized'))
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(id)

      if (!user || !user.token) {
        next(new Unauthorized('Not authorized'))
      }

      req.user = user
      next()
    } catch (error) {
      next(new Unauthorized('Internal Error'))
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { authenticate }