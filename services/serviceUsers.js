const { findUserByEmail, updateToken } = require('../db/users')
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email)

  if (!user || !(await user.validPassword(password))) {
    return null
  }

  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' })

  await updateToken(id, token)
  return token
}

const logout = async id => {
  const data = await updateToken(id, null)
  return data
}
module.exports = {
  login,
  logout,
}
