const express = require('express')
const router = express.Router()
const { postUser, getUserByEmail } = require('../../controllers/user')

/**
 * @ POST /users/register/registration
 * Отримує body {email, password}
 * Викликає функцію postUser
 */
router.post('/registration', postUser)

/**
 * @ GET /users/login
 * Отримує body {_id, password, email, subscription, token}
 * Викликає функцію getUserByEmail
 */
router.get('/', getUserByEmail);


module.exports = router