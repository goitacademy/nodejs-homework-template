const express = require('express')

const { register, login, logout, currentUser, updateBySubscription } = require('../../controllers/users')
const { validateBody, authenticate } = require('../../middlewares')
const {registerSchema, loginSchema, updateBySubscriptionSchema} = require('../../schemas/users')

const router = express.Router()

router.post('/register', validateBody(registerSchema), register)
router.post('/login', validateBody(loginSchema), login)
router.get('/logout', authenticate, logout)
router.get('/current', authenticate, currentUser)
router.patch('/', authenticate, validateBody(updateBySubscriptionSchema), updateBySubscription)

module.exports = router