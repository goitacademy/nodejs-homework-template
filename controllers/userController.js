const { Unauthorized, BadRequest, Conflict, NotFound } = require('http-error')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const Jimp = require('jimp')
const { nanoid } = require('nanoid')
const fs = require('fs/promises')
const path = require('path')
const avatarsDir = path.join(__dirname, '../', 'public', 'avatars')

const { joiRegisterSchema, joiLoginSchema } = require('../model/user')
const { User } = require('../model/index')
const sendEmail = require('../helpers')

const { SECRET_KEY, SITE_NAME } = process.env

const signupUser = async (req, res, next) => {
  try {
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

    const verificationToken = nanoid()
    const newUser = await User.create({
      password: hashingPassword,
      avatarURL: image,
      email,
      verificationToken,
      subscription,
    })
    const data = {
      to: email,
      subject: 'Email confirmation',
      html: `<a target="_blank" href="${SITE_NAME}/users/verify/${verificationToken}">Confirm email</a>`,
    }
    await sendEmail(data)
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
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      throw new Unauthorized('Email is wrong')
    }
    if (!user.verify) {
      throw new Unauthorized('User not found')
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
        email: user.email,
        subscription: user.subscription,
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

    const { path: tempUpload, filename } = req.file

    await Jimp.read(tempUpload)
      .then((resizeImg) => {
        return resizeImg.resize(250, 250).write(tempUpload)
      })
      .catch((err) => next(err))

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

const userVerification = async (req, res, next) => {
  try {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })
    if (!user) {
      throw new NotFound('User not found')
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: null,
      verify: true,
    })
    res.json({ message: 'Verification successful' })
  } catch (error) {
    next(error)
  }
}
const secondVerify = async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email) {
      throw new BadRequest('missing required field email')
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new NotFound('User not found')
    }
    if (user.verify) {
      throw new BadRequest('Verification has already been passed')
    }
    const { verificationToken } = user
    const data = {
      to: email,
      subject: 'Email confirmation',
      html: `<a target="_blank" href="${SITE_NAME}/users/verify/${verificationToken}">Confirm email</a>`,
    }
    await sendEmail(data)

    res.json({ message: 'Verification email sent' })
  } catch (error) {
    next(error)
  }
}
module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
  updateAvatar,
  userVerification,
  secondVerify,
}
