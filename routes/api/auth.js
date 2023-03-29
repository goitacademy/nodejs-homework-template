const express = require('express')
const ctrlWrapper = require('../../helpers/ctrlWrapper')
const authController = require('../../controllers/authController')
const { validateBody } = require('../../middlewares/validateBody');
const { registerSchema, loginSchema } = require('../../schemas/auth');
const { auth } = require('../../middlewares/auth');


const router = express.Router()

router.post('/register', validateBody(registerSchema), ctrlWrapper(authController.register))
router.post('/login', validateBody(loginSchema), ctrlWrapper(authController.login))
router.get('/logout', auth, ctrlWrapper(authController.logout))

module.exports = router