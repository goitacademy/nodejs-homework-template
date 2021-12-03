const express = require('express')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const fs = require('fs/promises')
const path = require('path')
const router = express.Router()
const upload = require('../../middlewares/uploadMiddleware')
const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser,
  addAvatar
} = require('../../model/authController')

const avatarDir = path.join(__dirname, '../../public/avatars')

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const newUser = await signupUser(email, password)
    res.status(201)
    res.json(newUser)
  } catch (error) {
    res.json(error.message)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const login = await loginUser(email, password)
    res.status(200)
    res.json(login)
  } catch (error) {
    res.json(error.message)
  }
})

router.post('/logout', authMiddleware, async (req, res, next) => {
  const { _id } = req.user
  const userLogout = await logoutUser(_id)
  if (userLogout !== undefined) {
    res.status(204)
    res.json('No content')
    return
  }
  res.status(401)
  res.json('Not authorized')
})

router.get('/current', authMiddleware, async (req, res, next) => {
  const { _id } = req.user
  const userCurrent = await currentUser(_id)
  if (userCurrent !== undefined) {
    res.status(200)
    res.json(userCurrent)
    return
  }
  res.status(401)
  res.json('Not authorized')
})

router.patch('/avatars', authMiddleware, upload.single('avatar'), async (req, res, next) => {
  const { _id } = req.user
  if (req.file === undefined) {
    res.status(401)
    res.json('No any file')
    return
  }
  const { path: tempUpload, originalname } = req.file
  try {
    const resultUpload = path.join(avatarDir, originalname)
    await fs.rename(tempUpload, resultUpload)
    const avatar = path.join('/avatars', originalname)
    const newAvatar = await addAvatar(_id, avatar)
    res.status(200)
    res.json(newAvatar)
    return
  } catch (error) {
    res.status(401)
    res.json(error)
  }
})

module.exports = router
