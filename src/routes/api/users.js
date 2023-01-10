const express = require('express')
const router = express.Router()

const { userValidation } = require('../middlewares/userValidation')
const { authMiddleware } = require('../middlewares/authMiddleware')
const { subscriptionValidation } = require('../middlewares/subscriptionMiddleware')
const {
    registrationController,
    loginController,
    logoutController,
    getCurrentController,
    updateSubscriptionController
} = require('../../controllers/authControllers')

const { asyncWrapper } = require('../../helpers/apiHelpers')

router.post('/register', userValidation, asyncWrapper(registrationController))
router.get('/login', userValidation, asyncWrapper(loginController))
router.post('/logout', authMiddleware, asyncWrapper(logoutController))
router.get('/current', authMiddleware, asyncWrapper(getCurrentController))
router.patch('/', authMiddleware, subscriptionValidation, asyncWrapper(updateSubscriptionController))


module.exports = router