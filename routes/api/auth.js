const express = require('express')

const router = express.Router()

const authControler = require('../../cntrl/auth-controler')

const {authentication} = require('../../middlewares')

router.post('/register', authControler.signup)

router.post('/login', authControler.login)

router.get('/current', authentication, authControler.getCurrent)

router.post('/logout', authentication, authControler.logout)

module.exports = router