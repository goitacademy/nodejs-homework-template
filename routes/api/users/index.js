const express = require('express')
const router = express.Router()
const { reg, login, logout } = require('../../../controllers/users')

router.post('/registration', reg)
router.post('/login', login)
router.post('/logout', logout)

module.exports = router
