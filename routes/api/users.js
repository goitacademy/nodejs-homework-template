const express = require('express')

const { joiSchema } = require('../../models/user')
const { controllerWrapper, validation } = require('../../middelwares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', controllerWrapper(ctrl.logout))

module.exports = router
