/* eslint-disable eol-last */
const express = require('express')

const { controllerWrapper, validation, authenticate } = require('../../middlewares')
const { joiSchema } = require('../../models/user-contact')
const { userContacts: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add))
router.get('/', authenticate, controllerWrapper(ctrl.getAll))

module.exports = router