const fs = require('fs/promises')
const path = require('path')
const gravatar = require('gravatar')

const { User } = require('../../models')

const usersDir = path.join(__dirname, '../../', 'public/avatars')
console.log('** usersDir:', usersDir)

const add = async (req, res) => {
  console.log('** req.body.email:', req.body.email)
  const defaultAvatarURL = gravatar.url(req.body.email, { s: '250' }, true)
  console.log('** defaultAvatarURL:', defaultAvatarURL)
  const newUser = { ...req.body, avatarURL: defaultAvatarURL }

  const result = await User.create(newUser)
  console.log('** result._id:', result._id, '** result:', result)

  const id = result._id.toString()
  console.log('** id:', id)

  const dirPath = path.join(usersDir, id)
  console.log('** dirPath:', dirPath)

  await fs.mkdir(dirPath)
  console.log("**mkdir 'dirPath:", dirPath)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  })
}

module.exports = add
