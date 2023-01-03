const express = require('express')

const router = express.Router();

const ctrl = require('../../controllers/auth')

const { ctrlWrapper } = require('../../helpers')

const { schemas } = require('../../models/user')

const { validateBody, authenticate } = require('../../meddlewares')


router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register))

router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login))

router.post('/logout', authenticate, ctrlWrapper(ctrl.logout))

router.get('/current', authenticate, ctrlWrapper(ctrl.getCurrent))

router.patch('/', authenticate, ctrlWrapper(ctrl.updateSubscription))


module.exports = router
