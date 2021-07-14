const { Storage } = require('@google-cloud/storage')
const fs = require('fs').promises
const jimp = require('jimp')

const { Users } = require('../db/usersModel')

const storage = new Storage()
const bucketName = 'contacts-db'

const uploadAvatars = async (filePath, fileName) => {
   await storage.bucket(bucketName).upload(filePath, {
    destination: fileName
  })
}

const downloadUserAvatar = async (fileName) => {
   await storage.bucket(bucketName).file(fileName).download({
    destination: `./tmp/${fileName}`  })
}

const changeAvatar = async ( {userId, file} ) => {
  if (!file) {
    throw new Error('Please provide a photo')
  }
  const img = await jimp.read(file.path)
  await img
    .autocrop()
    .cover(
      250,
      250,
      jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
  )
    .writeAsync(file.path)
  
  await uploadAvatars(file.path, file.filename).catch(console.error)
  await fs.rm(file.path)
  const options = {
      version: 'v2', 
      action: 'read',
      expires: Date.now() + 1000 * 60 * 60,
    }

  const [url] = await storage
    .bucket(bucketName)
    .file(file.filename)
    .getSignedUrl(options)
  
  await Users.findOneAndUpdate({_id: userId }, {$set: {avatarURL: url}})
  return url
}

module.exports = {
  changeAvatar,
  downloadUserAvatar
}