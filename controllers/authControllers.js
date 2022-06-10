const { Conflict, Unauthorized, NotFound } = require('http-errors')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const fs = require('fs/promises')
const path = require('path')
const jimp = require('jimp')

const { User } = require('../model/user')

const avatarsDir = path.join(__dirname, '../public/avatars')

require('dotenv').config()
const { SECRET_KEY } = process.env

const signUp = async (req, res, next) => {
  const { email, password } = req.body
  const avatarURL = gravatar.url(email, { protocol: 'https', s: '250' })
  const user = await User.findOne({ email })
  if (user) {
    next(new Conflict('Email in use'))
  }

  const newUser = new User({ email, avatarURL })
  newUser.setPassword(password)
  const avatarFolder = path.join(avatarsDir, String(newUser._id))
  await fs.mkdir(avatarFolder)
  await newUser.save()

  res.status(201).json({
    status: 'success',
    code: 201,
    user: {
      email,
      subscription: 'starter',
    },
  })
}

const logIn = async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user || !user.comparePassword(password)) {
    next(new Unauthorized('Email or password is wrong'))
  }

  const payload = { id: user._id }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })

  await User.findByIdAndUpdate(user._id, { token })
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  })
}

const logOut = async (req, res, next) => {
  const { _id } = req.user

  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).json({
    status: 'success',
    code: 204,
  })
}

const getDataCurrentUser = async (req, res) => {
  const { email, subscription } = req.user

  res.status(200).json({
    status: 'success',
    code: 200,
    user: {
      email,
      subscription,
    },
  })
}

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user
  const { subscription } = req.body
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  )

  if (!result) {
    throw new NotFound(`Contact with id '${_id}' not found`)
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    result,
  })
}

const updateAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file
  console.log('originalname', originalname)

  try {
    const { _id } = req.user
    const fileName = `${String(_id)}_${originalname}`
    const resultUpload = path.join(avatarsDir, fileName)
    await fs.rename(tmpUpload, resultUpload)
    const avatarURL = path.join('/avatars', fileName)
    const file = await jimp.read(resultUpload)
    file.resize(250, 250).write(resultUpload)

    const result = await User.findByIdAndUpdate(
      _id,
      { avatarURL },
      { new: true }
    )

    if (!result) {
      throw new NotFound(`User with id:${_id} not found`)
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      avatarURL,
    })
  } catch (error) {
    await fs.unlink(tmpUpload)
    next(error)
  }
}

module.exports = {
  signUp,
  logIn,
  logOut,
  getDataCurrentUser,
  updateSubscription,
  updateAvatar,
}