const { login } = require('../../model/users')

const loginController = async (req, res) => {
  const { email, password } = req.body
  await login(email, password)
  res.status(200).json({ message: 'success' })
}

module.exports = { loginController }
