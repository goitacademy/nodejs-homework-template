// const sgMail = require('@sendgrid/mail')
const { findUserByEmail, addUser } = require('../db/users')
const {
  login,
  logout,
  uploadAvatar,
  verifyUser,
  reVerifyUser,
} = require('../services/serviceUsers')
require('dotenv').config()
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const registration = async (req, res) => {
  const user = await findUserByEmail(req.body.email)

  if (user) {
    return res
      .status(409)
      .json({ message: 'User with such email already exists' })
  }

  const { email, subscription } = await addUser(req.body)
  res.status(201).json({ user: { email, subscription } })
}

const logIn = async (req, res) => {
  const token = await login(req.body)

  if (token) {
    const { email, subscription } = await findUserByEmail(req.body.email)
    return res.status(200).json({ token, user: { email, subscription } })
  }

  res.status(401).json({ message: 'Invalid email or password' })
}

const logOut = async (req, res, next) => {
  await logout(req.user.id)
  res.status(204).json({ message: 'No Content' })
}

const findCurrentUser = async (req, res) => {
  const { email, subscription } = req.user
  res.status(200).json({ email, subscription })
}

const setAvatar = async (req, res, next) => {
  const avatarUrl = await uploadAvatar(req, res)
  res.status(200).json({ avatarUrl })
}

const verify = async (req, res, next) => {
  try {
    const result = await verifyUser(req.params)
    if (result) {
      return res.status(200).json({ message: 'Verification successful' })
    }
    return res.status(404).json({ message: 'Inavlid token' })
  } catch (error) {}
}

const reVerify = async (req, res) => {
  const result = await reVerifyUser(req.body.email)

  if (result) {
    return res
      .status(200)
      .json({ message: 'Email with verification has been sent' })
  }

  res.status(400).json({ message: 'Verification has already been passed' })
}

module.exports = {
  registration,
  logIn,
  logOut,
  findCurrentUser,
  setAvatar,
  verify,
  reVerify,
}
