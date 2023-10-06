const express = require('express')
const router = express.Router()
const { postUser } = require('../../controllers/user')


router.post('/registration', postUser)

module.exports = router