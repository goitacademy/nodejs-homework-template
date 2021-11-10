const jwt = require('jsonwebtoken')
const User = require('../schemas/User')

const { SECRET_KEY } = process.env

const authorize = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Error()
    }

    jwt.verify(token, SECRET_KEY)

    const user = await User.findOne({ token })
    if (!user) {
      throw new Error()
    }

    req.user = user

    next()
  } catch (error) {
    throw new Error()
  }
}

module.exports = authorize
