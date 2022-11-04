const { User } = require('../../models')
const path = require('path')
const fs = require('fs/promises')

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async (req, res) => {
  const { path: tempUpLoad, originalname } = req.file
  const { _id: id } = req.user
  const imageName = `${id}_${originalname}`
  try {
    const resultUpload = path.join(avatarDir, imageName)
    await fs.rename(tempUpLoad, resultUpload)
    const avatarUrl = path.join('public', 'avatars', imageName)
    await User.findByIdAndUpdate(req.user._id, { avatarUrl })
    res.status(201).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL: avatarUrl,
      },
    })
  } catch (error) {
    await fs.unlink(tempUpLoad)
    throw error
  }
}

module.exports = updateAvatar
