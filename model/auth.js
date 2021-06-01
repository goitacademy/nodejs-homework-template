const User = require('../schemas/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SEKRET_KEY = process.env.JWT_SECRET_KEY

const login = async (email, password) => {
  try {
    const user = await User.findByEmail(email)
    if (!user || !user.validPassword(password)) {
      return null
    }
    const userId = user.id
    const payload = { userId }
    const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: '1h' })
    await User.updateToken(userId, token)
    return token
  } catch {
    return {}
  }
}

const logout = async (userId) => {
  try {
    const token = await User.updateToken(userId, null)
    return token
  } catch {
    return {}
  }
}

module.exports = {
  login,
  logout
}
