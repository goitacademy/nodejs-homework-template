const express = require('express')

const router = express.Router()

const authControler = require('../../cntrl/auth-controler')

const {authentication, upload} = require('../../middlewares')

router.post('/register', authControler.signup)

router.post('/login', authControler.login)

router.get('/current', authentication, authControler.getCurrent)

router.post('/logout', authentication, authControler.logout)

router.patch('/avatars', upload.single("avatar"), authentication, authControler.avatars)

module.exports = router