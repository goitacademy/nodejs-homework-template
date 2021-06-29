const { registration, login } = require('../services/authService')

const registrationController = async (req, res) => {
  const { password, email, subscription } = req.body
  await registration(password, email, subscription)
  res.status(200).json({ message: 'user added' })
}
const loginController = async (req, res) => {
  const { password, email } = req.body
  const rightPassword = await login(email, password)
  if (rightPassword) {
    res.status(200).json({ message: 'user login success' })
  } else {
    res.status(404).json({ message: 'user login error' })
  }
}

module.exports = { registrationController, loginController }
