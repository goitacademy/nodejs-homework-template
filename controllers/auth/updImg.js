const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models')

const userDir = path.join(__dirname, '../../', 'public/avatars')

const updImg = async (req, res) => {
  const { id } = req.user
  const { path: tmpPath, originalname } = req.file
  const updPath = path.join(userDir, id, originalname)

  try {
    const img = await Jimp.read(tmpPath)
    await img.resize(250, 250).write(tmpPath)

    await fs.rename(tmpPath, updPath, () => {})

    const avatarUrl = `/avatars/${id}/${originalname}`

    await User.findByIdAndUpdate(id, { avatarUrl })
    res.json({
      status: 'success',
      code: 200,
      data: { avatarUrl }
    })
  } catch (error) {
    fs.unlink(tmpPath)
    throw error
  }
}

module.exports = updImg
