const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const { User } = require('../model')

const { SECRET_KEY } = process.env

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return next(new Unauthorized('Not authorized'))
  }

  const [bearer, token] = authorization.split(' ')
  if (bearer !== 'Bearer') {
    return next(new Unauthorized('Not authorized'))
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findById(_id)
    if (!user || !user.token || user.token !== token) {
      return next(new Unauthorized('Not authorized'))
    }
    req.user = user
    next()
  } catch (error) {
    return next(new Unauthorized(error.message))
  }
}

module.exports = authenticate
