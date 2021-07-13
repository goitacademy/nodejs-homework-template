const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')
const { findUserByEmail, updateToken } = require('../db/users')
const { IMAGE_DIR } = require('../helpers/contactsHelper')
const User = require('../db/Shemas/usersModel')
const { sendEmail } = require('../services/serviceEmail')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const login = async ({ email, password }) => {
  const user = await findUserByEmail(email)

  if (!user || !((await user.validPassword(password)) || user.verify)) {
    return null
  }
  const id = user.id
  const payload = { id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' })

  await updateToken(id, token)
  return token
}

const logout = async id => {
  const data = await updateToken(id, null)
  return data
}

const uploadAvatar = async (req, res) => {
  try {
    if (req.file) {
      const { file } = req
      const image = await jimp.read(file.path)
      await image
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
        )
        .writeAsync(file.path)
      const uploadDir = path.join(IMAGE_DIR, file.originalname)
      fs.rename(file.path, uploadDir)
      const fullUrl =
        req.protocol + '://' + req.get('host') + '/avatars/' + file.originalname
      const updatedUrl = await changeUserAvatar(req, fullUrl)
      return updatedUrl
    }
  } catch (err) {
    console.log(err.message)
  }
}

const changeUserAvatar = async (req, uploadDir) => {
  const { _id } = req.user
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { avatarURL: uploadDir },
    { new: true },
  )
  return updatedUser.avatarURL
}

const verifyUser = async ({ token }) => {
  const user = await User.findOne({ verifyToken: token })
  if (user) {
    await user.updateOne({ verify: true, verifyToken: null })
    return true
  }
  return false
}

const reVerifyUser = async email => {
  const user = await User.findOne({ email, verify: false })

  if (user) {
    await sendEmail(user.verifyToken, email)
    return true
  }
}
module.exports = {
  login,
  logout,
  uploadAvatar,
  verifyUser,
  reVerifyUser,
}
