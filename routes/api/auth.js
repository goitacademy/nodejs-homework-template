const express = require('express')
const router = express.Router()

const { joiSchema } = require('../../models/user')
const { controllerWrapper, validation } = require('../../middleware')
const { auth: ctrs } = require('../../controllers')

router.post('/register', validation(joiSchema), controllerWrapper(ctrs.register))
router.post('/login', validation(joiSchema), controllerWrapper(ctrs.login))
router.get('/logout', controllerWrapper(ctrs.logout))

module.exports = router
