// const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const User = require('../models/user')

const authenticate = async(req, _, next) => {
  // const { SECRET_KEY } = process.env

  try {
    const [bearer, token] = req.headers.authorization.split(' ')

    if (bearer !== 'Bearer') {
      throw new Unauthorized('Not authorized')
    }
    // добить проверку токена на валидность
    // const { id } = jwt.verify(token, SECRET_KEY)
    const user = await User.findOne({ token })

    if (!user) {
      throw new Unauthorized('Not authorized')
    }

    req.user = user

    next()
  } catch (error) {
    throw new Unauthorized('Not authorized')
  }
}

module.exports = authenticate
