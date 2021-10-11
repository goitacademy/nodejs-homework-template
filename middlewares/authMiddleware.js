const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../helpers/errors')

const authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      next(new NotAuthorizedError('Please, provide a token in request authorization header'))
    }
    const [, token] = authorization.split(' ')

    if (!token) {
      next(new NotAuthorizedError('Please, provide a token'))
    }
    const user = jwt.decode(token, process.env.JWT_SECRET)
    const newUser = await User.findById(user._id)
    if (!newUser) next(new NotAuthorizedError('Invalid token'))
    if (newUser.token !== token) next(new NotAuthorizedError('Invalid token'))

    req.user = newUser
    req.token = token
    next()
  } catch (error) {
    next(new NotAuthorizedError('Invalid token'))
  }
}

module.exports = { authMiddleware }
