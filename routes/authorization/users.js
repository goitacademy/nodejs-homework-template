const express = require('express')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const router = express.Router()
const {
  signupUser,
  loginUser,
  logoutUser,
  currentUser
} = require('../../model/authController')

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

module.exports = router
