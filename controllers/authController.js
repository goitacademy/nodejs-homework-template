import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { notFoundHttpError } from '../helpers/NotFoundHttpError.js'
import { User } from '../models/User.js'

const { JWT_SECRET } = process.env

export const register = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return next(new createHttpError.Conflict('Email in use'))
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({ ...req.body, password: hashPassword })
  res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } })
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
