const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatars = async (req, res) => {
  const { _id: id } = req.user
  const { path: tempPath, originalname } = req.file
  const uploadPath = path.join(avatarsDir, `${id}`, originalname)
  try {
    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)

    await fs.rename(tempPath, uploadPath)
    const avatar = `/avatars/${id}/${originalname}`
    await User.findByIdAndUpdate(id, { avatarURL: avatar })

    res.status(201).json({
      status: 'success',
      code: 200,
      data: {
        result: avatar,
      },
    })
  } catch (error) {
    await fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateAvatars
