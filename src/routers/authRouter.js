const {
  registrationController,
  loginController,
  logOutController,
  getCurrentUserController,
  subscriptionController,
  updateAvatarController,
} = require('../controllers/authControllers')
const express = require('express')
const router = new express.Router()
const multer = require('multer')
// const shortid = require('shortid')
const path = require('path')

const { userValidation } = require('../middlewares/authValidationMiddleware')
const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')
const {
  subscriptionCheckMiddleware,
} = require('../middlewares/subscriptionMiddleware')

const FILE_DIR = path.resolve(__dirname, '../../tmp')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR)
  },
  filename: (req, file, cb) => {
    const [name, extension] = file.originalname.split('.')
    cb(null, `${name}.${extension}`)
  },
  limits: {
    fileSize: 1048576,
  },
})

const uploadMiddleware = multer({ storage })

router.post('/signup', userValidation, asyncWrapper(registrationController))
router.post('/login', userValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logOutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))
router.patch(
  '/avatar',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(updateAvatarController),
)
router.patch(
  '/',
  authMiddleware,
  subscriptionCheckMiddleware,
  asyncWrapper(subscriptionController),
)

module.exports = {
  authRouter: router,
}
