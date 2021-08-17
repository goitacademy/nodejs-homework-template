const { User } = require('.././db/user')
require('dotenv').config()
const fs = require('fs').promises
const { v4: uuidv4 } = require('uuid')
const jimp = require('jimp')
const path = require('path')

const IMG_DIR = path.resolve('../public/avatarts')

const uploadController = async (file) => {
  try {
    const [, extension] = file.originalname.split('.')
    const newName = `${uuidv4()}.${extension}`

    const newAvatar = path.join(IMG_DIR, newName)
    if (file) {
      const img = await jimp.read(file.path)
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE,
        )
        .writeAsync(file.path)
      await fs.rename(file.path, newAvatar)
      return path.join('avatars', newName).replace('\\', '/')
    }
  } catch (error) {
    return error
  }
}

const updateAvatar = async (id, file) => {
  try {
    const avatarURL = await uploadController(file)
    await User.findByIdAndUpdate(id, { avatarURL }, { new: true })
    return avatarURL
  } catch (error) {
    return error
  }
}

module.exports = {
  updateAvatar,
}