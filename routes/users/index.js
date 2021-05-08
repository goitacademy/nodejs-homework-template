const express = require('express')
const router = express.Router()
const {
    registration,
    login,
    logout,
    current,
} = require('../../controllers/users')
const guard = require('../../helper/guard')

router.post('/registration', registration)

router.post('/login', login)

router.post('/logout', guard, logout)

router.get('/current', guard, current)


module.exports = router
