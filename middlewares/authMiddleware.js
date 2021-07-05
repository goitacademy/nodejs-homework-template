const jwt = require('jsonwebtoken')
const User = require('../services/usersServices')
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const { NotAuthorizedError } = require('../helpers/errors')

const authMiddleware = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    next(new NotAuthorizedError('Not authorized'))
  }
  try {
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, JWT_SECRET_KEY, async (error, decoded) => {
      const user = await User.getUserById(decoded?.id)
      if (error || !user || !user.token || user.token !== token) {
        next(new NotAuthorizedError('Invalide token'))
      }
      req.user = user
      next()
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authMiddleware
}
