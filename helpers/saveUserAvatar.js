const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
const cloudinary = require('cloudinary').v2
const { promisify } = require('util')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})
const uploadToCloud = promisify(cloudinary.uploader.upload)

const saveUserAvatarToCloud = async ({ user, file }) => {
  const filePath = file.path
  const {
    public_id: idCloudAvatar,
    secure_url: avatarURL,
  } = await uploadToCloud(filePath, {
    public_id: user.idCloudAvatar?.replace('Avatars/', ''),
    folder: 'Avatars',
    transformation: { width: 250, height: 250, crop: 'pad' },
  })
  await fs.unlink(filePath)
  return { idCloudAvatar, avatarURL }
}



const saveUserAvatar = async ({ user, file }) => {
  const FOLDER_AVATARS = process.env.FOLDER_AVATARS
  const filePath = file.path
  const img = await jimp.read(filePath)
  await img
    .autocrop()
    .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER | jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(filePath)

  try {
    if (user.avatarURL.includes(`${FOLDER_AVATARS}/`)) {
      await fs.unlink(path.join(process.cwd(), 'public', user.avatarURL))
    }
  } catch (e) {
    console.log(e.message)
  }

  const newFileName = `${Date.now()}-${file.originalname}-${user.id}`
    
  try {
    await fs.rename(
      filePath,
      path.join(process.cwd(), 'public', FOLDER_AVATARS, newFileName)
    )
  } catch (e) {
    console.log(e.message)
  }

  return path.join(FOLDER_AVATARS, newFileName).replace('\\', '/')
}

module.exports = { saveUserAvatar, saveUserAvatarToCloud }