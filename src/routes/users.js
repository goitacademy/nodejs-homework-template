const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../helpers/apiHelpers')
const {
  signupController,
  loginController,
  logoutController,
  currentUserController,
  switchSubscriptionController
} = require('../controllers/usersController')

const { userValidation } = require('../middlewares/validationMiddleware')
const { authMiddleware } = require('../middlewares/authMiddleware')

router.post('/signup', userValidation, asyncWrapper(signupController))
router.post('/login', userValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', asyncWrapper(currentUserController))
router.patch('/', asyncWrapper(switchSubscriptionController))

module.exports = router