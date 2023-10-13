const express = require('express')
const router = express.Router()
const middlewareToken = require('../../middleware/middlewareToken')
const { getUserByEmail } = require('../../controllers/user')
const { postUser } = require('../../controllers/user')


router.post('/registration', postUser)


/**
 * @ GET /users/login
 * Отримує body {_id, password, email, subscription, token}
 * Викликає функцію getUserByEmail
 */
router.post('/login', middlewareToken, getUserByEmail)


module.exports = router