const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const upload = require('../helpers/multer')

const { regLogValidation } = require('../middlewares/userValidation')
const { authMiddleware } = require('../middlewares/authMiddleware')

router.post('/signup', regLogValidation, usersController.signUp)

router.post('/login', regLogValidation, usersController.logIn)

router.post('/logout', authMiddleware, usersController.logOut)

router.get('/current', authMiddleware, usersController.currentUser)

router.patch('/', authMiddleware, usersController.patchSubscription)

router.patch(
  '/avatars',
  authMiddleware,
  upload.single('avatar'),
  usersController.avatars
)

module.exports = router
