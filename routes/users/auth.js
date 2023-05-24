const express = require('express')
const validateBody = require("../../middlewares/validateBody")
const { schemas } = require('../../models/user')
const router = express.Router()
const ctrl = require('../../controllers/auth')
const auth = require('../../middlewares/auth')

router.post('/register', validateBody(schemas.registerSchema), ctrl.register)

router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

router.get('/current', auth, ctrl.getCurrent)

router.post('/logout', auth, ctrl.logout)

module.exports = router;