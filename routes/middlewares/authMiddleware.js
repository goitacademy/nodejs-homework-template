const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../../db/userModel')

const authMiddleware = async (req, res, next) => {
  const { authorization = '' } = req.headers
  const [tokenType, token] = authorization.split(' ')
  try {
    if (tokenType !== 'Bearer' || !token) {
      throw new Unauthorized('Not authorized')
    }
    const { id } = jwt.decode(token, process.env.JWT_SECRET)
    const user = await User.findById(id)
    console.log(user.email)
    if (!user || !user.token) {
      throw new Unauthorized('Not authorized')
    }
    req.token = token
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authMiddleware,
}
