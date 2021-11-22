const express = require('express')
const authRouter = express.Router()
const {
  authenticateUser
} = require('../../middleware/authenticateUser')
const {
  signupController,
  signinController,
  signoutController,
  currentController,
  patchUserController,
  patchAvatarController
} = require('../../controllers/auth')
const {
  registrationValidation
} = require('../../middleware/validation')

const {
  errorHandler
} = require('../../helpers/errorHandler')
const {
  uploadMiddleware
} = require('../../middleware/uploadAvatarMiddleware')

authRouter.post('/signup', registrationValidation, errorHandler(signupController))
authRouter.post('/login', registrationValidation, errorHandler(signinController))
authRouter.post('/logout', authenticateUser, errorHandler(signoutController))
authRouter.post('/current', authenticateUser, errorHandler(currentController))
authRouter.patch('/', authenticateUser, errorHandler(patchUserController))
authRouter.patch('/avatar', authenticateUser, uploadMiddleware.single('newAvatar'), errorHandler(patchAvatarController))

module.exports = authRouter
