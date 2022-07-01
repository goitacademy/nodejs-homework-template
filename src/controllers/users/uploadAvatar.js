const fs = require('fs/promises')
const path = require('path')
const {v4} = require('uuid')


const avatarDir = path.join(process.env.INIT_CWD, 'public', 'avatars')

const uploadAvatar = async(req, res) => {

  const { path: tempUpload, originalname} = req.file
  const resultUpload = path.join(avatarDir, originalname)
  const imagePath = path.join('avatars', originalname)

  const newAvatar = {
    name: req.body.name,
    id: v4(),
    image: imagePath
  }

  try {
    await fs.rename(tempUpload, resultUpload)
    res.status(201).json(newAvatar)

  } catch (err) {
    await fs.unlink(tempUpload)
  }
}

module.exports = uploadAvatar
