const express = require('express')
const multer = require('multer')
const path = require('path')
const {uid} = require('uid')

const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')
const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  switchSubscriptionController,
  changeAvatarController
} = require('../controllers/usersController')

const { userValidation } = require('../middlewares/validationMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')

const AVATAR_TMP_DIR = path.resolve('./tmp')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_TMP_DIR)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    cb(null, `${uid()}.${extension}`)
  }
})
const uploadMiddleware = multer({storage})

router.post('/signup', userValidation, asyncWrapper(signupController))
router.post('/login', userValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(currentUserController))
router.patch('/', asyncWrapper(switchSubscriptionController))
router.patch('/avatars', authMiddleware,  uploadMiddleware.single('avatar'), asyncWrapper(changeAvatarController))

module.exports = { authRouter: router}