const jwt = require('jsonwebtoken')
const { NotAuthorizedError } = require('../helpers/errors')
const { Users } = require('../db/usersModel')

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    next(new NotAuthorizedError("Please provide a token."))
  }

  const [tokenType, token] = authorization.split(" ")

  if (tokenType !== 'Bearer') {
    next(new NotAuthorizedError("Invalid token type."))
  }
  
  const user = await Users.findOne({token})
    if (!user) {
      next(new NotAuthorizedError("Invalid token."))
    }

  try { 
    const { _id } = jwt.decode(token, process.env.JWT_SECRET)
    req.userId = _id
    req.token = token
    next()
  } catch (err) {
    next(new NotAuthorizedError(err.message))
  }
}

module.exports = {
  authMiddleware
}