const {
  registration,
  login,
  getUsersService,
} = require('../dbServices/authService')
const registrationController = async (req, res) => {
  const { password, email, subscription } = req.body

  await registration(password, email, subscription)
  res.status(201).json({ message: 'user added' })
}
const loginController = async (req, res) => {
  const { password, email } = req.body
  const token = await login(email, password)
  if (token) {
    res.status(200).json({ message: 'user login success', token })
  } else {
    res.status(404).json({ message: 'user login error' })
  }
}
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getUsersService()
    res.status(200).json(allUsers)
  } catch (err) {
    console.error(err)
  }
}
module.exports = { registrationController, loginController, getAllUsers }
