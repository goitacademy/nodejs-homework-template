const express = require('express')

const authControllers = require('../../controllers/auth-controller.js')

const isEmptyBody = require('../../middlewares/isEmptyBody.js')
const validateBody = require('../../decorators/validateBody.js')
const userSchema = require('../../models/User.js')
const authenticate = require('../../middlewares/authenticate.js')

const userSignupValidate = validateBody(userSchema.userSignupSchema);
const userSigninValidate = validateBody(userSchema.userSigninSchema)

const authRouter = express.Router()

authRouter.post('/users/register', isEmptyBody, userSignupValidate, authControllers.signup)

authRouter.post('/users/login', isEmptyBody, userSigninValidate, authControllers.signin)

authRouter.get('/users/current', authenticate, authControllers.getCurrent)

authRouter.post('/users/logout', authenticate, authControllers.logout)

module.exports = authRouter