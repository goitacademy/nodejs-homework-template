import bcrypt from 'bcryptjs'
import fs from 'fs/promises'
import gravatar from 'gravatar'
import createHttpError from 'http-errors'
import Jimp from 'jimp'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import path from 'path'
import { notFoundHttpError } from '../helpers/NotFoundHttpError.js'
import sendEmail from '../helpers/sendEmail.js'
import { User } from '../models/User.js'

const { JWT_SECRET } = process.env

const avatarsFolder = path.resolve('public', 'avatars')

export const register = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return next(new createHttpError.Conflict('Email in use'))
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const avatarURL = gravatar.url(email)
  const verificationToken = nanoid()
  const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken })

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  }
  await sendEmail(verifyEmail)

  res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } })
}

export const verify = async (req, res) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    return next(new createHttpError.NotFound('User not found'))
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  })

  res.json({
    message: 'Verification successful',
  })
}

export const resendVerifyEmail = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return next(new createHttpError.NotFound('User not found'))
  }
  if (user.verify) {
    return next(new createHttpError.BadRequest('Verification has already been passed'))
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  }

  await sendEmail(verifyEmail)

  res.json({
    message: 'Verification email sent',
  })
}

export const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return next(new createHttpError.Unauthorized('Email or password invalid'))
  }
  const passwordCompare = await bcrypt.compare(password, user.password)

  if (!passwordCompare) {
    return next(new createHttpError.Unauthorized('Email or password invalid'))
  }

  const { _id: id } = user
  const payload = { id }

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
  await User.findByIdAndUpdate(id, { token })

  res.json({ token, user: { email, subscription: user.subscription } })
}

export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user
  res.json({ email, subscription })
}

export const logout = async (req, res, next) => {
  const { _id } = req.user
  const user = await User.findByIdAndUpdate(_id, { token: '' })
  if (!user) {
    return next(new createHttpError.Unauthorized('Not authorized'))
  }
  res.status(204).json({})
}

export const subscription = async (req, res) => {
  const { _id } = req.user
  const result = await User.findByIdAndUpdate(_id, req.body, { new: true })
  if (!result) {
    return notFoundHttpError('Not found')
  }
  res.json(result)
}

export const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    return next(new createHttpError.BadRequest('Avatar must be provided'))
  }
  const { _id } = req.user
  const { path: tmpUpload, originalname } = req.file
  const fileName = `${nanoid()}_${originalname}`
  const resultUpload = path.join(avatarsFolder, fileName)
  Jimp.read(tmpUpload, (err, image) => {
    if (err) return next(notFoundHttpError(err))
    image.resize(250, 250).write(resultUpload)
  })
  await fs.unlink(tmpUpload)
  const avatarURL = path.join('avatars', fileName)
  await User.findByIdAndUpdate(_id, { avatarURL })

  res.json({ avatarURL })
}
