/* eslint-disable indent */
/* eslint-disable eol-last */
const express = require('express')

const { controllerWrapper, validation } = require('../../middlewares')
const { joiSchema } = require('../../models/user')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/users/signup', validation(joiSchema), controllerWrapper(ctrl.signup))
router.post('/users/login', validation(joiSchema), controllerWrapper(ctrl.login))
router.get('/users/logaut', controllerWrapper(ctrl.logout))

module.exports = router