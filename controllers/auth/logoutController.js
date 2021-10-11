const { logout } = require('../../model/users')

const logoutController = async (req, res, next) => {
  const { email, password } = req.body
  await logout(email, password)
  res.status(200).json({ message: 'success' })
}

module.exports = { logoutController }
