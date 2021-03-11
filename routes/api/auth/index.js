const express = require('express')
const router = express.Router()
const guard = require('../../../model/helpers/guard')
const { reg, login, logout } = require('../../../controllers/auth')

router.post('/register', reg)
router.post('/login', login)
router.post('/logout', guard, logout)

module.exports = router
