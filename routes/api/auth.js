const express = require('express')

const { JoiUserSchema } = require('../../models/user')
const { authenticate, validation, tryCatchWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

const userValidationMiddleware = validation(JoiUserSchema)

router.post('/register', userValidationMiddleware, tryCatchWrapper(ctrl.signup))

router.post('/login', userValidationMiddleware, tryCatchWrapper(ctrl.login))

router.get('/current', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.current))

router.get('/logout', tryCatchWrapper(authenticate), tryCatchWrapper(ctrl.logout))

module.exports = router
