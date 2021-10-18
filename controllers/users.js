const { Conflict, BadRequest, NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')
const { User } = require('../model')
const { sendSuccess, avatarConvert } = require('../utils')
const path = require('path')
const fs = require('fs/promises')
const { v4 } = require('uuid')
const { sendEmail } = require('../utils')

const uploadDir = path.join(__dirname, '../', 'public')
const { SECRET_KEY } = process.env

const signup = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
  }
  const verifyToken = v4()
  const newUser = new User({ email, verifyToken })

  newUser.setPassword(password)

  await newUser.save()
  const data = {
    to: email,
    subject: 'Confirm your email address, please!',
    html: `
            <a href="http://localhost:3000/api/users/verify/${verifyToken}" target="_blank">Confirm Email Address</a>
            `,
  }
  await sendEmail(data)

  sendSuccess.users(res, {
    email,
    subcriprion: newUser.subscription,
    avatarURL: newUser.avatarURL,
    verifyToken: newUser.verifyToken,
  })
}

const verify = async (req, res) => {
  const { verifyToken } = req.params
  console.log('verifyToken:', verifyToken)
  const user = await User.findOne({ verifyToken })
  if (!user) {
    throw new NotFound('User not found')
  }
  await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true })
  res.status(200).json({ message: 'Verification successful' })
}

const repeatVerify = async (req, res) => {
  const { email } = req.body
  const user = await User.findOne({ email }, '_id email verifyToken verify ')

  if (user.verify) {
    throw new BadRequest('Verification has already been passed')
  }
  const data = {
    to: email,
    subject: "Let's try again! Сonfirm your email address, please!",
    html: `
            <a href="http://localhost:3000/api/users/verify/${user.verifyToken}" target="_blank">Confirm Email Address</a>
            `,
  }
  await sendEmail(data)
  res.status(200).json({ message: 'Verification email sent' })
}

const signin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne(
    { email },
    '_id email password subscription verify '
  )
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest('Email or password is wrong')
  }

  if (!user.verify) {
    throw new BadRequest('Email not verify')
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
  const newFileName = `avatar-image_${_id}.${extention}`
  const fileName = path.join(uploadDir, 'avatars', newFileName)

  await fs.rename(tmpName, fileName)

  const { avatarURL } = await User.findByIdAndUpdate(
    _id,
    { avatarURL: fileName },
    { new: true }
  )
  sendSuccess.avatar(res, avatarURL)
}

module.exports = {
  signup,
  verify,
  repeatVerify,
  signin,
  signout,
  currentUser,
  updateSubscription,
  updateAvatar,
}
