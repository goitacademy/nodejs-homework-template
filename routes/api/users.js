const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController.js')
const authMiddleware = require('../../middlewares/authMiddleware.js')
const uploadMiddleware = require('../../middlewares/uploadMiddleware')

router.post(
  '/signup',
  // uploadMiddleware.single('avatar'),
  usersController.signup
)
router.post('/login', usersController.login)
router.post('/logout', usersController.logout)
router.get('/activate/:link', usersController.activate)
router.get('/refresh', usersController.refresh)
router.get('/current', authMiddleware, usersController.getCurrentUser)
router.patch(
  '/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  usersController.avatars
)

module.exports = router