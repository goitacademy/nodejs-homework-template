const User = require('../schemas/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SEKRET_KEY = process.env.JWT_SECRET_KEY

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user || !user.validPassword(password)) {
      return null
    }
    const id = user.id
    const payload = { id }
    const token = jwt.sign(payload, SEKRET_KEY, { expiresIn: '1h' })
    await updateToken(id, token)
    return token
  } catch {
    return {}
  }
}

const logout = async (userId) => {
  try {
    const user = await updateToken(userId, null)
    return { token: user.token }
  } catch {
    return {}
  }
}

const updateToken = async (userId, token) => {
  const updatedToken = await User.findByIdAndUpdate(
    { _id: userId },
    { token },
    { new: true }
  )
  return updatedToken
}

module.exports = {
  login,
  logout,
  updateToken
}
