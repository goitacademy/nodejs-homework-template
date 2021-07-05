/* eslint-disable promise/param-names */
const Users = require('../model/schemaUser')
const cloudinary = require('cloudinary').v2
const fs = require('fs/promises')
require('dotenv').config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true
})

const getUserById = async (id) => {
  return await Users.findById(id)
}

const getUserByEmail = async (email) => {
  return await Users.findOne({ email })
}

const addUser = async (body) => {
  const user = await Users(body)
  return user.save()
}

const updateToken = async (id, token) => {
  await Users.updateOne({ _id: id }, { token })
}

const userUpdateSubscription = async (id, subscription) => {
  if (Users.schema.path('subscription').enumValues.includes(subscription)) {
    await Users.updateOne({ id: id, subscription: subscription })
  }
  console.log('Not valid subscription')
}

const uploadCloud = (pathFile) => {
  return new Promise((res, rej) => {
    cloudinary.uploader.upload(
      pathFile,
      { folder: 'Avatars', transformation: { width: 250, crop: 'fill' } },
      (error, result) => {
        if (error) rej(error)
        if (result) res(result)
      }
    )
  })
}

const updateAvatar = async (id, pathFile) => {
  try {
    const { secure_url: avatar, public_id: idCloudAvatar } = await uploadCloud(
      pathFile
    )
    const oldAvatar = await Users.findOne({ _id: id })
    cloudinary.uploader.destroy(oldAvatar.idCloudAvatar, (err, res) => {
      if (err) {
        console.log(err)
        return
      }
      console.log(res)
    })
    await Users.updateOne({ _id: id }, { avatarURL: avatar, idCloudAvatar })
    await fs.unlink(pathFile)
    return avatar
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = {
  getUserById,
  getUserByEmail,
  addUser,
  updateToken,
  userUpdateSubscription,
  updateAvatar
}
