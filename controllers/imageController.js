const fs = require('fs').promises
const path = require('path')
const { updateAvatar } = require('../model/userModel')
const createFolderIsExist = require('../helpers/create-dir')
const Jimp = require('jimp')
const { HttpCode } = require('../helpers/constants')

const avatar = async (request, response, next) => {
  try {
    const id = request.user.id
    const avatarURL = await saveAvatarToStatic(request)
    await updateAvatar(id, avatarURL)
    return response.json({
      status: 'success',
      code: HttpCode.OK,
      data: { avatarURL },
    })
  } catch (error) {
    next(error)
  }
}

const saveAvatarToStatic = async (req) => {
  const id = req.user.id
  const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS
  const pathFile = req.file.path
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`
  const img = await Jimp.read(pathFile)
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile)
  await createFolderIsExist(path.join(AVATARS_OF_USERS, id))
  await fs.rename(pathFile, path.join(AVATARS_OF_USERS, id, newNameAvatar))
  const avatarURL = path.normalize(path.join(id, newNameAvatar))
  try {
    await fs.unlink(
      path.join(process.cwd(), AVATARS_OF_USERS, req.user.avatarURL)
    )
  } catch (error) {
    console.log(error.message)
  }
  return avatarURL
}

module.exports = {
  avatar,
}
