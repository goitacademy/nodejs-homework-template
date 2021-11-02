const path = require('path')
const fs = require('fs/promises')

const { User } = require('../../models')
const { Unauthorized } = require('http-errors')

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user
  const { path: tempDir, originalname } = req.file
  const [extension] = originalname.split('.').reverse()
  const filename = `${_id}.${extension}`
  const uploadDir = path.join(__dirname, '../../', 'public\\avatars', filename)

  await fs.rename(tempDir, uploadDir)

  if (!_id) {
    throw new Unauthorized('Not authorized')
  }
  const img = path.join('avatars', filename)
  await User.findByIdAndUpdate(_id, { avatarURL: img })
  res.json({
    status: 'success',
    code: 200,
    data: {
      avatarURL: img,
    },
  })
}

module.exports = updateAvatar
