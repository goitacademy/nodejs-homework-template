const express = require('express')
const controllerUsers = require('../../controllers/users')
const router = express.Router()
const guard = require('../../helpers/guard')
const { createAccountLimiter } = require('../../helpers/reate-limit')

router.post('/signup', createAccountLimiter, controllerUsers.signup)
router.post('/login', controllerUsers.login)
router.post('/logout', guard, controllerUsers.logout)
router.get('/current', guard, controllerUsers.current)
router.patch('/', guard, controllerUsers.subscription)

module.exports = router
