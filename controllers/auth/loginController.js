const { login } = require('../../model/users')

const loginController = async (req, res, next) => {
  const { email, password } = req.body
  const token = await login(email, password)
  res.status(200).json({ message: 'success', token })
}

module.exports = { loginController }
