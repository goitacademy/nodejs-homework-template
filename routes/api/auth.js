const express = require('express')
const router = express.Router()
const { validateAuth } = require('./authvalidate')
const authenticate = require('../../middlewares/autenticate')

const { registration, login, logout, getCurrentUser} = require('../../controllers/auth')

router.post('/signup', validateAuth, registration)

router.post('/login', validateAuth, login)

router.post('/logout', authenticate, logout)

router.get('/current', authenticate, getCurrentUser)


module.exports = router