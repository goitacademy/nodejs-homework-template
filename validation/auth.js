const jwt = require('jsonwebtoken')
const { CustomError } = require('.././template/error')
const { code } = require('.././template/http-code-template')
require('dotenv').config()
const { User } = require('.././db/user')

const auth = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  console.log(token)
  if (!token) {
    next(new CustomError(code.UNAUTHORIZED, 'Not authorized'))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET_KEY)
    req.token = token
    req.user = user

    const userInDb = await User.findOne({ _id: user.id })
    console.log(userInDb)
    if (!userInDb || userInDb.token !== token) {
      next(new CustomError(code.UNAUTHORIZED, 'Not authorized'))
    }
    next()
  } catch (error) {
    next(new CustomError(code.UNAUTHORIZED, 'Not authorized'))
  }
}

module.exports = {
  auth
}
