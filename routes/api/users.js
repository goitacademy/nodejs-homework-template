const express = require('express')
const router = express.Router()
const { postUser } = require('../../controllers/user')

/**
 * @ GET /users/register/registration
 * Отримує body
 * Викликає функцію postUser
 */
router.post('/registration', postUser)

module.exports = router