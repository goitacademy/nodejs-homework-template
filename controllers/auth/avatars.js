const path = require('path')
const fs = require('fs/promises')
const Jimp = require('Jimp')

const { User } = require('../../models')
const { sendSuccessResponse } = require('../../helpers')

const uploadDir = path.join(__dirname, '../../', 'public')

const avatars = async (req, res) => {
  const { originalname, path: tempDir } = req.file

  try {
    const [extension] = originalname.split('.').reverse()
    const newImageName = `user_${req.user._id}_avatar.${extension}`
    const originalImage = await Jimp.read(tempDir)
    const resizedImage = await originalImage.cover(250, 250)

    await resizedImage.write(`${uploadDir}/avatars/newImageName`)

    fs.unlink(tempDir)

    const avatar = path.join('/avatars', newImageName)

    const { avatarURL } = await User.findByIdAndUpdate(req.user._id, { avatarURL: avatar, }, { new: true })

    sendSuccessResponse(req, { avatarURL })
  } catch (error) {
    fs.unlink(tempDir)
  }
}

module.exports = avatars
