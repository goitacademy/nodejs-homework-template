const Jimp = require('jimp')
const path = require('path')
const fs = require('fs').promises

const User = require('../../schemas/User')

const patchUserAvatar = async (user, file) => {
  try {
    const newPath = `/public/avatars/${file.filename}`
    const newAbsolutePath = path.join(__dirname, '../../', 'public', 'avatars', file.filename)

    const newAvatar = await Jimp.read(file.path)
    newAvatar.cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER, Jimp.VERTICAL_ALIGN_MIDDLE).write(newAbsolutePath)

    const result = await User.findByIdAndUpdate(user._id, { avatarURL: newPath }, { returnDocument: 'after' })

    return { email: result.email, avatarURL: result.avatarURL }
  } catch (err) {
    console.log(err.message)
  } finally {
    await fs.unlink(file.path)
  }
}

module.exports = { patchUserAvatar }
