const fs = require('fs/promises')
const path = require('path')
const Jimp = require('jimp')

const { User } = require('../../models')

const usersDir = path.join(__dirname, '../../', 'public/avatars')
console.log('* usersDir:', usersDir)

const updateImg = async (req, res) => {

  const { id } = req.params
  console.log('* req.file:', req.file)

  const { path: tempPath, originalname } = req.file
  console.log('*   tempPath:', tempPath)

  const uploadPath = path.join(usersDir, id, originalname)
  console.log('* uploadPath:', uploadPath)

  try {
    const file = await Jimp.read(tempPath)
    await file.resize(250, 250).write(tempPath)
    console.log('*Jimp:')

    await fs.rename(tempPath, uploadPath)
    console.log("*'uploadPath:", uploadPath)
    const avatarURL = `/avatars/${id}/${originalname}`
    console.log('* avatarURL:', avatarURL)
    User.findByIdAndUpdate(id, { avatarURL })
    await User.findByIdAndUpdate(id, { avatarURL })
    console.log('* unlink:')
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: avatarURL,
      },
    })
  } catch (error) {
    await fs.unlink(tempPath)
    console.log('* unlink:',)
    throw error
  }
}

module.exports = updateImg
