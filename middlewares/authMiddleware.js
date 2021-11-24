const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
  try {
    const [tokenType, token] = req.headers.authorization.split(' ')
    const user = jwt.decode(token, process.env.JWT_SECRET)
    if (!user) {
      next(new Error('Please provide a token'))
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    next(new Error('Invalid token'))
  }
}
module.exports = { authMiddleware }
