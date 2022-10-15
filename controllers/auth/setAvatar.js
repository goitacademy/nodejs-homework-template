const path = require('path')
const fs = require('fs/promises')
const Jimp = require('jimp')
const { basedir } = global

const { User } = require(`${basedir}/models/user`)

const avatarsDir = path.join(basedir, 'public', 'avatars')

const setAvatar = async (req, res) => {
  try {
    const { _id } = req.user
    const { path: tempPath, originalname } = req.file
    const [extension] = originalname.split('.').reverse()
    const newName = `${_id}.${extension}`
    const uploadPath = path.join(avatarsDir, newName)
    await fs.rename(tempPath, uploadPath)
    const avatarURL = path.join('avatars', newName)
    const minAvatarURL = path.join('public/avatars', newName)

    Jimp.read(minAvatarURL, (error, newName) => {
      if (error) throw error
      newName.resize(250, 250).quality(60).write(minAvatarURL)
    })

    await User.findByIdAndUpdate(_id, { avatarURL: minAvatarURL })
    res.json({
      avatarURL,
    })
  } catch (error) {
    await fs.unlink(req.file.path)
    throw error
  }
}

module.exports = setAvatar