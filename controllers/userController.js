const { Unauthorized, BadRequest, Conflict } = require('http-error')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
gravatar = require('gravatar')

const fs = require('fs/promises')
const path = require('path')
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars')

const { joiRegisterSchema, joiLoginSchema } = require('../model/user')
const { User } = require('../model/index')

const { SECRET_KEY } = process.env

const signupUser = async (req, res, next) => {
  try {
    // console.log('req.body controllewr', req.body)

    const { error } = joiRegisterSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { password, email, subscription } = req.body
    const image = gravatar.url(email)
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict('Email in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hashingPassword = await bcrypt.hash(password, salt)
    const newUser = await User.create({
      password: hashingPassword,
      avatarURL: image,
      email,
      subscription,
    })
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        image: newUser.image,
      },
    })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { error } = joiLoginSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { email, password, subscription } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw new Unauthorized('Email is wrong')
    }
    const passwordMatching = await bcrypt.compare(password, user.password)
    if (!passwordMatching) {
      throw new Unauthorized('Password is wrong')
    }

    const { _id } = user
    const payload = {
      id: _id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })

    await User.findByIdAndUpdate(_id, { token })
    res.json({
      token,
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    if (Unauthorized) {
      error.status = 401
    }
    next(error)
  }
}

const logoutUser = async (req, res) => {
  const { _id } = req.user
  await User.findByIdAndUpdate(_id, { token: null })
  res.status(204).send()
}

const getUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Unauthorized('Not authorized')
    }
    const { email, subscription } = req.user
    res.json({
      user: {
        email,
        subscription,
      },
    })
  } catch (error) {
    if (error) {
      error.status = 401
    }
    next()
  }
}
const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user
    console.log('_id', _id)
    const { path: tempUpload, filename } = req.file
    const [extension] = filename.split('.').reverse()
    const newFileName = `${_id}.${extension}`
    const newFilePath = path.join(avatarsDir, newFileName)
    await fs.rename(tempUpload, newFilePath)
    const avatarURL = path.join('avatars', newFileName)
    await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })
    res.json(201).json(avatarURL)
  } catch (error) {
    if (error) {
      throw new Unauthorized('Not authorized')
    }

    next(error)
  }
}

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
  updateAvatar,
}
