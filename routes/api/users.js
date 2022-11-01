const express = require('express')

const { validateBody, authenticate } = require('../../middlewares')

const { ctrlWrapper } = require('../../helpers')

const { schemas } = require('../../models/user')

const ctrl = require('../../controllers/user')

const router = express.Router()

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

// signin
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent))

router.get('/logout', authenticate, ctrlWrapper(ctrl.logout))

module.exports = router
