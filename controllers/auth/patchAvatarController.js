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
  const {
    originalname,
    path: temporaryFilePath
  } = req.file
  const resultDirectory = path.join(avatarsDirectory, `${req.user._id}_${originalname}`)
  const { _id } = req.user
  try {
    await fs.rename(temporaryFilePath, resultDirectory)
    jimp.read(resultDirectory).then(image => image.resize(250, 250).write(resultDirectory))
    const src = path.join('./avatars', `${_id}_${originalname}`)
    await UserModel.findByIdAndUpdate(_id, {
      avatarURL: src
    })
    res.status(200).json({
      newAvatar: src
    })
  } catch (err) {
    await fs.unlink(temporaryFilePath)
    throw new Unauthorized('Not authorized')
  }
}

module.exports = {
  patchAvatarController
}
