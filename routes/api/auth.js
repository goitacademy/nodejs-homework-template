const express = require('express')

const { controllerWrapper } = require('../../middleware/wrapper')
const { validation } = require('../../middleware/validation')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../models/user')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

module.exports = router
