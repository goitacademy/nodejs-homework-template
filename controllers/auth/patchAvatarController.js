const path = require('path')
const fs = require('fs/promises')
const {
  UserModel
} = require('../../db/userModel')
const {
  Unauthorized
} = require('http-errors')
const jimp = require('jimp')

const avatarsDirectory = path.join(__dirname, '../../public/avatars')

const patchAvatarController = async (req, res) => {
  try {
    const {
      originalname,
      path: originalFilePath
    } = req.file
    const resultDirectory = path.join(avatarsDirectory, `${req.user._id}_${originalname}`)
    await fs.rename(originalFilePath, resultDirectory)
    jimp.read(resultDirectory).then(image => image.resize(250, 250).write(resultDirectory))
    const src = path.join('./avatars', `${req.user._id}_${originalname}`)
    await UserModel.findByIdAndUpdate(req.user._id, {
      avatarURL: src
    })
    res.status(200).json({
      newAvatar: src
    })
  } catch (err) {
    throw new Unauthorized('Not authorized')
  }
}

module.exports = {
  patchAvatarController
}
