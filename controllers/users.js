const { Conflict, BadRequest } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../model')
const { sendSuccess, avatarConvert } = require('../utils')
const path = require('path')
const fs = require('fs/promises')
const uploadDir = path.join(__dirname, 'public')
const tempDir = path.join(__dirname, 'tmp')

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const newUser = new User({ email })

  newUser.setPassword(password)

  await newUser.save()

  sendSuccess.users(res, {
    email,
    subcriprion: newUser.subscription,
    avatarURL: newUser.avatarURL,
  })
}

const { SECRET_KEY } = process.env

const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }, '_id email password subscription ')
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }

  const { _id, subscription } = user
  const payload = {
    _id,
  }
  const token = jwt.sign(payload, SECRET_KEY)

  await User.findByIdAndUpdate(_id, { token })

  sendSuccess.users(res, { token, email, subscription })
}

const signout = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json({})
}

const currentUser = async (req, res) => {
  const { email, subscription } = req.user
  sendSuccess.users(res, { email, subscription })
}

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user
  const { subscription } = req.body
  await User.findByIdAndUpdate(_id, { subscription }, { new: true })
  sendSuccess.users(res, { email, subscription })
}

const updateAvatar = async (req, res) => {
  const { originalname, path: tmpName } = req.file
  if (!req.file) {
    throw new BadRequest('No found file in request!')
  }
  const { _id } = req.user
  await avatarConvert(tmpName)
  const [extention] = originalname.split('.').reverse()
  const newFileName = `product_main-image_${_id}.${extention}`
  const fileName = path.join(uploadDir, 'avatars', newFileName)

  await fs.rename(tmpName, fileName)

  const { avatarURL } = await User.findByIdAndUpdate(
    _id,
    { avatarURL: req.file },
    { new: true }
  )
  res.status(200).json({
    status: 'success',
    avatarURL,
  })
}

module.exports = {
  signup,
  signin,
  signout,
  currentUser,
  updateSubscription,
  updateAvatar,
}
