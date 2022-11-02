const express = require('express')

const ctrl = require('../../controllers/auth')

const { schemas } = require("../../models/user");

const { validateBody } = require("../../middlewares/Validation")
const {authenticate} = require('../../middlewares/Authentication');


const router = express.Router()


router.post('/signup', validateBody(schemas.registerSchema), ctrl.register)

router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

router.get('/current', authenticate, ctrl.current)

router.get('/logout',authenticate, ctrl.logout)






module.exports = router