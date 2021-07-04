const {
  registration,
  login,
  getUsersService,
} = require('../dbServices/authService')
const { validationOfUser } = require('../validation/validation')
const registrationController = async (req, res) => {
  const { password, email, subscription } = req.body
  const validationResult = validationOfUser(req.body)

  if (validationResult.error) {
    await res.status(400).json({ message: 'not valid entry/entries' })
    return
  }
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
