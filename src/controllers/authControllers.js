const { User } = require('../db/userModel')
const { ConflictError } = require('../helpers/errors')
const {
  userRegistration,
  userLogin,
  userLogOut,
  updateAvatar,
} = require('../services/authService')

const registrationController = async (req, res) => {
  const { email, password } = req.body
  const uniqueCheck = await User.exists({ email })
  if (uniqueCheck) {
    throw new ConflictError('Email in use')
  }
  const newUser = await userRegistration(email, password)

  res.status(201).json({ newUser, status: 'success' })
}

const loginController = async (req, res) => {
  const { email, password } = req.body

  const login = await userLogin(email, password)

  res.status(200).json(login)
}

const logOutController = async (req, res) => {
  const { _id } = req.user

  await userLogOut(_id)

  res.status(204).json({})
}

const getCurrentUserController = async (req, res) => {
  const { subscription, email } = req.user
  res.json({ status: 'success', subscription, email })
}

const subscriptionController = async (req, res) => {
  const { _id: userId } = req.user
  const { subscription } = req.body

  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { $set: { subscription } },
  )
  user.save()
  const updatedUser = await User.findById(
    { _id: userId },
    { __v: 0, password: 0, token: 0 },
  )
  res.json({ status: 'success', updatedUser })
}

const updateAvatarController = async (req, res) => {
  const { path: temporaryName, originalname } = req.file
  const [, extension] = originalname.split('.')
  const { _id } = req.user
  const avatarURL = await updateAvatar(
    temporaryName,
    originalname,
    _id,
    extension,
  )

  res.json({ avatarURL, status: 'success' })
}

module.exports = {
  registrationController,
  loginController,
  logOutController,
  getCurrentUserController,
  subscriptionController,
  updateAvatarController,
}
