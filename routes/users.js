const express = require('express')
const router = express.Router()
const ctrl = require('../controller/users')
const authenticateToken = require('../middlewares/tokenVerification')

// POST /users/register
router.post('/register', ctrl.register)

// POST /users/login
router.post('/login', ctrl.login)

// POST /users/logout
router.post('/logout', authenticateToken, ctrl.logout)

// GET /users/current
router.get('/current', authenticateToken, ctrl.getCurrentUser)

module.exports = router;
