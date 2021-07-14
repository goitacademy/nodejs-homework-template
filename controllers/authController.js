const {
  registration,
  login,
  logout,
  changeAvatar,
  getUsersService,
  verificationService,
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
const logoutController = async (req, res) => {
  const token = req.token
  const nullToken = await logout(token)
  res.status(200).json({ token: nullToken })
}
const avatarController = async (req, res) => {
  const { avatarURL } = req.body
  const token = req.token
  // const [, token] = req.headers.authorisation.split(' ')
  await changeAvatar(avatarURL, token)
  res.status(200).json({ avatarURL })
}
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await getUsersService()
    res.status(200).json(allUsers)
  } catch (err) {
    console.error(err)
  }
}
const virifyController = async (req, res) => {
  const user = await verificationService(req)
  if (user === null) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.json({ message: 'Verification successful' })
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  avatarController,
  virifyController,
  getAllUsers,
}
