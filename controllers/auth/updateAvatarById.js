const fs = require('fs/promises')
const path = require('path')
const Jimp = require("jimp")

const { User } = require('../../models')

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatarById = async (req, res) => {
  const { path: tempUpdate, originalname } = req.file
  const { _id } = req.user
  const fileName = `${_id}_${originalname}`

  try {
    const resultUptate = path.join(avatarsDir, fileName)
    const image = await Jimp.read(tempUpdate)

    await image
      .autocrop()
      .cover(250, 250, Jimp.VERTICAL_ALIGN_MIDDLE || Jimp.HORIZONTAL_ALIGN_CENTER)
      .writeAsync(tempUpdate)

    await fs.rename(tempUpdate, resultUptate)

    const avatarURL = path.join('public', 'avatars', fileName)

    await User.findByIdAndUpdate(_id, { avatarURL })

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempUpdate)
    throw error
  }
}

module.exports = updateAvatarById