const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../model')

const avatarDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res) => {
  const { path: tempPath, originalname } = req.file
  try {
    const { id } = req.params

    const uploadPath = path.join(avatarDir, id, originalname)
    const file = await Jimp.read(tempPath)
    await file.resize(255, 255).write(tempPath)
    await fs.rename(tempPath, uploadPath)
    const avatarURL = `/avatars/${id}/${originalname}`
    await User.findByIdAndUpdate(id, { avatarURL })
    res.json({ avatarURL: avatarURL })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateAvatar
