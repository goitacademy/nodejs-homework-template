const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const { User } = require('../models')

const { SECRET_KEY } = process.env

const authenticate = async (req, _, next) => {
  try {
    console.log('req.headers :', req.headers)
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') {
      throw new Unauthorized()
    }
    const { id } = jwt.verify(token, SECRET_KEY)
    console.log(typeof token)
    console.log('id :', id)

    const user = await User.findOne({ token })
    console.log('user :', user)
    if (!user) {
      throw new Unauthorized()
    }
    req.user = user
    next()
  } catch (error) {
    throw new Unauthorized(error.message)
  }
}

module.exports = authenticate
