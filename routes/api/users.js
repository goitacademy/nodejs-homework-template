const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs').promises
const multer = require('multer')
const jimp = require('jimp')
const sendGrid = require('@sendgrid/mail')
const User = require('../../model/schemas/user')
const { auth } = require('./auth')

sendGrid.setApiKey(process.env.SG_API_KEY)

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

router.get('/verify/:verificationToken', async (req, res, next) => {
  const { verificationToken } = req.params
  const user = await User.findOne({ verificationToken })
  if (!user) {
    return res.status(404).json({
      code: 404,
      message: 'User not found',
    })
  }
  await user.update({ verificationToken: null, verify: true })
  return res.status(200).json({
    code: 200,
    message: 'Verification successful',
  })
})

router.post('/verify', async (req, res, next) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({
      code: 400,
      message: 'Missing required field email',
    })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({
      code: 404,
      message: 'User not found',
    })
  }
  if (user.verify) {
    return res.status(400).json({
      code: 400,
      message: 'Verification has already been passed',
    })
  }
  const message = {
    to: user.email,
    from: 'dmicher911@gmail.com',
    subject: 'Verification letter',
    html: `<p>It seems that last time our letter did not reach you. Here is a new verification link.</p>
    <a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Verification link</a>`,
  }
  sendGrid.send(message).catch(error => {
    console.log(`Error: ${error.message}`)
  })
  return res.status(200).json({
    code: 200,
    message: 'Verification email sent',
  })
})

module.exports = router
