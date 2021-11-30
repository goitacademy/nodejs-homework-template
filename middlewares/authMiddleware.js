const jwt = require('jsonwebtoken')
const {
  NotAuthorizedError,
  TokenError
} = require('../helpers/errors')
const authMiddleware = (req, res, next) => {
  if (req.headers.authorization === undefined) {
    throw new NotAuthorizedError('Not authorized')
  }
  try {
    const [tokenType, token] = req.headers.authorization.split(' ')
    const user = jwt.decode(token, process.env.JWT_SECRET)
    if (!user) {
      throw new TokenError('Please provide a token')
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    throw new TokenError('Invalid token')
  }
}
module.exports = { authMiddleware }
