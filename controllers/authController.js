const {
  registration,
  login,
  logout,
  changeAvatar,
  getUsersService,
  verificationService,
  verificationCheckService,
} = require('../dbServices/authService')
const registrationController = async (req, res) => {
  const { password, email, subscription } = req.body

  await registration(password, email, subscription)
  res.status(201).json({ message: 'user added. Please verify by email' })
}
const loginController = async (req, res) => {
  const { password, email } = req.body
  const user = await login(email, password)
  if (!user) {
    res.status(404).json({ message: 'user login error' })
  } else if (!user.verify) {
    res.status(400).json({ message: 'Please, verify user by email' })
  } else if (user.token) {
    res.status(200).json({ message: 'user login success', token: user.token })
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
const checkVerificationController = async (req, res) => {
  const { email } = req.body
  const check = await verificationCheckService(email)
  if (!check) {
    res.status(200).json({ message: 'Verification email has been sent again' })
  } else {
    res.status(400).json({ message: 'Verification has already been passed' })
  }
}

module.exports = {
  registrationController,
  loginController,
  logoutController,
  avatarController,
  virifyController,
  checkVerificationController,
  getAllUsers,
}
