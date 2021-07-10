const express = require('express')
const router = express.Router()
const {
  registrationController,
  loginController,
  logoutController,
  // avatarController,
  getAllUsers,
} = require('../../controllers/authController')
const { asyncWrapper } = require('../../errorHelpers/apiHelpers')
const { validateUser } = require('../../middlewares/validationMiddleware')
const { authMiddleware } = require('../../middlewares/authMiddleware')

const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const UPLOADS_DIR = path.resolve('./tmp')
const { uploadController } = require('../../controllers/filesController')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR)
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split('.')
    req.fileName = `${uuidv4()}.${extension}`
    cb(null, req.fileName)
  },
})
const uploadMiddleware = multer({ storage })
router.patch(
  '/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(uploadController),
)
router.post('/register', validateUser, asyncWrapper(registrationController))

router.post('/login', validateUser, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/', asyncWrapper(getAllUsers))

// router.patch('/avatars', authMiddleware, asyncWrapper(avatarController))

module.exports = router
