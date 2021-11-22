const jsonwebtoken = require('jsonwebtoken')
const {
  Unauthorized
} = require('http-errors')
const { UserModel } = require('../db/userModel')

const authenticateUser = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization.split(' ')
    if (bearer !== 'Bearer') throw new Unauthorized('please, provide a bearer token')
    try {
      const { _id } = await jsonwebtoken.verify(token, process.env.SECRET_WORD)
      const user = await UserModel.findById(_id)
      if (!user || user.token !== token) throw new Unauthorized('Not authorized')
      req.user = user
      next()
    } catch (err) {
      throw new Unauthorized(err.message)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  authenticateUser
}
