const express = require('express')
const router = express.Router()
const ctrlUsers = require('../../controller/users')
const { validateSign } = require('../../services/validationUser.js')
const auth = require('../../services/auth')

router.post('/signup', validateSign, ctrlUsers.register)

router.post('/signin', validateSign, ctrlUsers.login)

router.post('/logout', auth, ctrlUsers.logout)

router.get('/current', auth, ctrlUsers.currentUser)

module.exports = router
