const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET_KEY

const onDecryptToken = (token) => {
  const modifiedToken = token.split(' ')
  const decriptedToken = jwt.verify(modifiedToken[1], secretKey)
  return decriptedToken
}

module.exports = { onDecryptToken }
