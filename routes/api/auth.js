/* eslint-disable indent */
/* eslint-disable eol-last */
const express = require('express')

const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema, joiSubscriptionSchema } = require('../../models/user')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/users/signup', validation(joiSchema), controllerWrapper(ctrl.signup))
router.post('/users/login', validation(joiSchema), controllerWrapper(ctrl.login))
router.get('/users/current', authenticate, controllerWrapper(ctrl.getUser))
router.patch('/users', authenticate, validation(joiSubscriptionSchema), controllerWrapper(ctrl.updateSubscription))
router.get('/users/logout', authenticate, controllerWrapper(ctrl.logout))

module.exports = router