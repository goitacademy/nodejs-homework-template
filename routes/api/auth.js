const express = require('express')
const authRouter = express.Router()
const {authenticateUser} = require('../../middleware/authenticateUser')
const {signupController, signinController, signoutController, currentController, patchUserController} = require('../../controllers/auth')
const {registrationValidation} = require('../../middleware/validation')

const { errorHandler } = require('../../helpers/errorHandler')

authRouter.post('/signup', registrationValidation, errorHandler(signupController))
authRouter.post('/login', registrationValidation, errorHandler(signinController))
authRouter.post('/logout', authenticateUser, errorHandler(signoutController))
authRouter.post('/current', authenticateUser, errorHandler(currentController))
authRouter.patch('/', authenticateUser, errorHandler(patchUserController))


module.exports = authRouter