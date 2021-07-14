const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const gravatar = require('gravatar')
const path = require('path')
const Jimp = require('jimp')
const fs = require('fs').promises

const { User } = require('../db/userModel')
const { NotAuthorizedError } = require('../helpers/errors')
const shortid = require('shortid')
const storeImage = path.join(process.cwd(), 'public/avatars')

const userRegistration = async (email, password) => {
  const avatarURL = gravatar.url(email, { protocol: 'http', s: '250' })
  const newUser = new User({ email, password, avatarURL })

  await newUser.save()
  const user = await User.findById(
    { _id: newUser._id },
    { subscription: 1, email: 1, avatarURL: 1, _id: 0 },
  )
  return user
}
const userLogin = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new NotAuthorizedError('Email or password is wrong')
  }
  if (!(await bcrypt.compare(password, user.password))) {
    throw new NotAuthorizedError('Email or password is wrong')
  }
  const token = jwt.sign(
    { _id: user._id, subscription: user.subscription, email: user.email },
    process.env.JWT_SECRET,
  )
  user.token = token
  await user.save()
  const loggedInUser = await User.findById(
    { _id: user._id },
    { subscription: 1, email: 1, _id: 0 },
  )
  return {
    token,
    loggedInUser,
  }
}

const userLogOut = async _id => {
  const user = await User.findById({ _id })
  user.token = null
  await user.save()
}

const updateAvatar = async (temporaryName, originalname, _id, extension) => {
  const newFilename = `${shortid()}.${extension}`
  const newFilePath = path.join(storeImage, newFilename)
  Jimp.read(temporaryName)
    .then(image => {
      image.resize(250, 250).write(newFilePath)
    })
    .catch(err => new NotAuthorizedError(err.message))
  try {
    await fs.rename(temporaryName, newFilePath)
    const user = await User.findById({ _id })
    const newPath = '/avatars/' + newFilename
    user.avatarURL = newPath
    await user.save()
    return newPath
  } catch (err) {
    await fs.unlink(temporaryName)
    return new NotAuthorizedError(err.message)
  }
}

module.exports = {
  userRegistration,
  userLogin,
  userLogOut,
  updateAvatar,
}
