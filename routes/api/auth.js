const express = require('express')
const router = express.Router()

const { loginController, register, logoutController, userInfoController } = require('../../controllers/auth')
const { updateUserController } = require('../../controllers/user')

const { asyncWrapper } = require('../../helpers/apiHelpers')
const { userValidation } = require('../../middlewares/validationMiddleware')
const { authMiddleware } = require('../../middlewares/authMiddleware')

router.post('/users/signup', userValidation, asyncWrapper(register))
router.post('/users/login', userValidation, asyncWrapper(loginController))
router.post('/users/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/users/current', authMiddleware, asyncWrapper(userInfoController))
router.patch('/users', authMiddleware, asyncWrapper(updateUserController))

module.exports = router
