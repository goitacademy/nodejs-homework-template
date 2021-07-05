const User = require('./usersServices')
const jwt = require('jsonwebtoken')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const login = async ({ email, password }) => {
  const user = await User.getUserByEmail(email)

  if (!user || !(await user.validPassword(password))) {
    return null
  }

  const id = user.id
  const token = jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '10h' })
  await User.updateToken(id, token)

  return token
}

const logout = async (id) => {
  const data = await User.updateToken(id, null)
  return data
}

module.exports = {
  login,
  logout
}
