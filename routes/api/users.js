const express = require('express')
const router = express.Router()
const { users } = require('../../controllers')
router.post('/signup', users.signup)
router.post('/login', users.login)
router.get('/logout', users.logout)

module.exports = router
