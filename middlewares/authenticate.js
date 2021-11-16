const { Unauthorized } = require('http-errors')
const jwt = require('jsonwebtoken')

const { User } = require('../model')
const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    }
    try {
      const { _id } = jwt.verify(token, SECRET_KEY)
      const user = await User.findById(_id)
      if (!user) {
        throw new Unauthorized('User not found')
      }
      if (!user.token) {
        throw new Unauthorized()
      }
      req.user = user
      next()
    } catch (error) {
      throw new Unauthorized()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = authenticate
