const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../model')

const avatarsDir = path.join(__dirname, '../../', 'public/avatars')

const updateUserAvatar = async (req, res) => {
  const { _id } = req.user
  const { originalname, path: tempPath } = req.file
  const dirPath = path.join(avatarsDir, `${_id}`)
  try {
    await fs.mkdir(dirPath)
  } catch (error) {
    console.log(error.message)
  }

  try {
    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(originalname)
    const uploadDir = path.join(dirPath, originalname)

    await fs.rename(tempPath, uploadDir)

    const avatarURL = `/public/avatars/${_id}/${originalname}`
    const user = await User.findByIdAndUpdate(_id, { avatarURL }, { new: true })

    res.json({
      user,
    })
  } catch (error) {
    fs.unlink(tempPath)
    throw error
  }
}

module.exports = updateUserAvatar
