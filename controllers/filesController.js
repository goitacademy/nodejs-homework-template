const { changeAvatar } = require('../dbServices/authService')
const path = require('path')
const fs = require('fs').promises
const AVATARS_DIR = path.resolve('./public/avatars')
const UPLOADS_DIR = path.resolve('./tmp')
const Jimp = require('jimp')
const uploadController = async (req, res) => {
  const avatar = await Jimp.read(`${UPLOADS_DIR}/${req.fileName}`)
  avatar.resize(250, 250).writeAsync(`${UPLOADS_DIR}/${req.fileName}`)

  await fs.rename(
    `${UPLOADS_DIR}/${req.fileName}`,
    `${AVATARS_DIR}/${req.fileName}`,
  )

  const avatarURL = `avatars/${req.fileName}`
  const token = req.token
  const email = await changeAvatar(avatarURL, token)

  res.status(200).json({ email, avatarURL })
}

module.exports = {
  uploadController,
}
