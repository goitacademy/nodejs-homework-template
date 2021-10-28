const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')
const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const avatars = async (req, res) => {
  const { path: tempDir, originalname } = req.file
  try {
    const [extention] = originalname.split('.').reverse()
    const newFileName = `user_avatar_${req.user._id}.${extention}`
    const resultStorage = path.join(avatarsDir, newFileName)
    const image = await Jimp.read(tempDir)
    await image.cover(250, 250).write(tempDir)
    await fs.rename(tempDir, resultStorage)
    const avatar = path.join('avatars', newFileName)
    await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: avatar },
      { new: true }
    )
    res.status(200).json({ avatarURL: avatar })
  } catch (error) {
    await fs.unlink(tempDir)
    throw error
  }
}

module.exports = avatars
