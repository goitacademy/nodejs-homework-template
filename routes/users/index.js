const express = require('express')
const router = express.Router()
const {
    registration,
    login,
    logout,
    } = require('../../controllers/users')

router.post('/registration', registration)

router.post('/registration', login)

router.post('/registration', logout)



module.exports = router
