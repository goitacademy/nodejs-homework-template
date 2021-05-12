const jimp = require('jimp')
const path = require('path')
const fs = require('fs/promises')
require('dotenv').config()

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

module.exports = saveUserAvatar