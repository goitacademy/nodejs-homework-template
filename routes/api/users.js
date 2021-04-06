const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs').promises
const multer = require('multer')
const User = require('../../model/schemas/user')
const { auth } = require('./auth')
const jimp = require('jimp')

const tmpDir = path.join(process.cwd(), 'tmp')
const avatarsDir = path.join(process.cwd(), 'public/avatars')

const uploadOptions = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tmpDir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
  limits: {
    fileSize: 1048576,
  },
})

const uploadMiddleware = multer({
  storage: uploadOptions,
})

router.get('/current', auth, async (req, res, next) => {
  const { _id } = req.user
  const user = await User.findOne({ _id })
  if (!user) {
    return res.status(401).json({
      code: 401,
      message: 'Not authorized',
    })
  }
  return res.status(200).json({
    code: 200,
    email: user.email,
    subscription: user.subscription,
  })
})

router.patch('/avatars', auth, uploadMiddleware.single('avatar'), async (req, res, next) => {
  const { _id } = req.user
  const user = await User.findOne({ _id })
  if (!user) {
    return res.status(401).json({
      code: 401,
      message: 'Not authorized',
    })
  }
  const { path: uploadPath, originalname } = req.file
  const tempName = path.join(tmpDir, originalname)
  const fileName = `${user.email.split('@')[0]}-${originalname}`
  const finalName = path.join(avatarsDir, fileName)
  try {
    await fs.rename(uploadPath, tempName)
    await jimp
      .read(tempName)
      .then(avatar => {
        return avatar.resize(256, 256).write(tempName)
      })
      .catch(err => {
        throw err
      })
    await fs.rename(tempName, finalName)
  } catch (err) {
    await fs.unlink(uploadPath)
    return next(err)
  }
  const updatedUser = await User.findOneAndUpdate({ _id }, { avatarURL: `/avatars/${fileName}` }, { useFindAndModify: false, new: true })
  return res.status(200).json({
    code: 200,
    avatarURL: updatedUser.avatarURL,
  })
})

module.exports = router
