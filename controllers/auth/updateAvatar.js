const { NotFound } = require('http-errors')
const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models/user')

const contactsDir = path.join(__dirname, '../../', 'public/avatars')

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  if (!_id) {
    res.status(401).json({
      status: 'error',
      code: 401,
      message: 'Not authorized'
    })
  }
  const { originalname, path: tempName } = req.file
  const [extention] = originalname.split('.').reverse()
  const newFileName = `user_main-image_${_id}.${extention}`
  const resultStorage = path.join(contactsDir, newFileName)
  await fs.rename(tempName, resultStorage)
  Jimp.read(resultStorage)
    .then(file => {
      return file
        .resize(250, 250)
        .write(newFileName)
    })
    .catch(err => {
      console.error(err)
    })
  const avatar = path.join('/', newFileName)
  const user = await User.findByIdAndUpdate(_id, { avatarURL: avatar }, { new: true })
  if (!user) {
    throw new NotFound(`User with id=${_id} not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    data: {
      user
    }
  })
}

module.exports = updateAvatar
