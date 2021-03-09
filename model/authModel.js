const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.JWT_SECRET_KEY

const userModel = require('../model/userModel')

const login = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email)
  if (!user || !(await user.validPassword(password))) {
    return null
  }
  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await userModel.updateUserToken(id, token)
  return { token, userEmail: user.email, subscription: user.subscription }
}

const logout = async (id) => {
  await userModel.updateUserToken(id, null)
}

module.exports = {
  login,
  logout,
}
