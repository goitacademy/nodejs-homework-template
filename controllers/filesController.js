const { changeAvatar } = require('../dbServices/authService')
const path = require('path')
const fs = require('fs').promises
const AVATARS_DIR = path.resolve('./public/avatars')
const UPLOADS_DIR = path.resolve('./tmp')
const Jimp = require('jimp')
const uploadController = async (req, res) => {
  Jimp.read(`${UPLOADS_DIR}/${req.fileName}`)
    .then(avatar => {
      avatar.resize(256, 256)
    })
    .catch(err => {
      throw err
    })
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
