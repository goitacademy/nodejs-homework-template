const fs = require('fs/promises')
const path = require('path')
const CreateError = require('http-errors')

const { User } = require('../../model')
const Jimp = require('jimp')

const contactsDir = path.join(__dirname, '../../public/avatar')

const updateAvatars = async (req, res, next) => {
  const { _id } = req.user
  const file = await Jimp.read(req.file.path)
  await file.resize(250, 250).write(req.file.path)
  const { path: tempUpload, originalname } = req.file
  console.log(req.file)
  try {
    const fileName = `${_id}_${originalname}`
    const resultUpload = path.join(contactsDir, fileName)
    await fs.rename(tempUpload, resultUpload)
    const avatar = path.join('/avatars', fileName)

    const result = await User.findByIdAndUpdate(_id, { avatar }, { new: true })
    if (!result) {
      throw new CreateError(404, `Contact with id-'${_id}' not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    await fs.unlink(tempUpload)
    next(error)
  }
}

module.exports = updateAvatars
