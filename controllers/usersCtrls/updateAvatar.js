const { Unauthorized } = require('http-error')
gravatar = require('gravatar')
const Jimp = require('jimp')

const fs = require('fs/promises')
const path = require('path')
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const { User } = require('../../model/index')

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
module.exports = {
  updateAvatar,
}
