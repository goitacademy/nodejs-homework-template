const express = require('express');
const {validateBody, authenticate} = require('../../middlewares')
const { registerSchema, loginSchema } = require("../../models/User")
const ctrl = require('../../controllers/auth-controllers')

const router = express.Router();

router.post('/register', validateBody(registerSchema), ctrl.register)
router.post('/login', validateBody(loginSchema), ctrl.login)
router.get('/current', authenticate, ctrl.current)
router.post('/logout', authenticate, ctrl.logout)
router.patch('/', authenticate, ctrl.updateSubscription)

module.exports = router;
