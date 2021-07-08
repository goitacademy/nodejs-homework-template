const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../helpers/errors')

const authMiddleware = async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const [tokenType, token] = req.headers.authorization.split(' ')

  if (!token) {
    next(new NotAuthorizedError('Please, provide a token'))
  }

  try {
    const user = await jwt.decode(token, process.env.JWT_SECRET)
    if (!user) {
      next(new NotAuthorizedError('Invalid token'))
    }
    const validUserId = user._id
    const validUser = await User.findById({ _id: validUserId })
    if (token !== validUser.token) {
      next(new NotAuthorizedError('Not authorized'))
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    next(new NotAuthorizedError(error.message))
  }
}

module.exports = {
  authMiddleware,
}
