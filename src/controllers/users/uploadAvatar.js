const fs = require('fs/promises')
const path = require('path')
const {v4} = require('uuid')
const { User } = require('../../../models')


const avatarDir = path.join(__dirname, '../../../', 'public', 'avatars')

const uploadAvatar = async(req, res) => {

  const { path: tempUpload, originalname } = req.file
  const { _id: id } = req.user

  const resultUpload = path.join(avatarDir, `${id}_${originalname}`)
  const imagePath = path.join('avatars', `${id}_${originalname}`)

  const newAvatar = {
    name: req.body.name,
    id: v4(),
    url: imagePath
  }

  try {
    await fs.rename(tempUpload, resultUpload)
    await User.findByIdAndUpdate(id, {avatarURL: imagePath})
    res.status(201).json(newAvatar)

  } catch (err) {
    await fs.unlink(tempUpload)
  }
}

module.exports = uploadAvatar
