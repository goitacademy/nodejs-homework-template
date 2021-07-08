const {
  registrationController,
  loginController,
  logOutController,
  getCurrentUserController,
  subscriptionController,
} = require('../controllers/authControllers')
const express = require('express')
const router = new express.Router()

const { userValidation } = require('../middlewares/authValidationMiddleware')
const { asyncWrapper } = require('../helpers/apiHelpers')
const { authMiddleware } = require('../middlewares/authMiddleware')
const {
  subscriptionCheckMiddleware,
} = require('../middlewares/subscriptionMiddleware')

router.post('/signup', userValidation, asyncWrapper(registrationController))
router.post('/login', userValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logOutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentUserController))
router.patch(
  '/',
  authMiddleware,
  subscriptionCheckMiddleware,
  asyncWrapper(subscriptionController),
)

module.exports = {
  authRouter: router,
}
