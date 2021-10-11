const express = require('express')
const router = express.Router()

const { loginController, register, logoutController } = require('../../controllers/auth')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { userValidation } = require('../../middlewares/validationMiddleware')

router.post('/users/signup', userValidation, asyncWrapper(register))
router.post('/users/login', asyncWrapper(loginController))
router.post('/users/logout', asyncWrapper(logoutController))

module.exports = router
