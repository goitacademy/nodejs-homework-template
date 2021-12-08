const express = require('express')

const { validation, ctrlWrapper } = require('../../middlewares')
const { auth: ctrl } = require('../../controllers')
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user')

const router = express.Router()

router.post('/signup', validation(joiRegisterSchema), ctrlWrapper(ctrl.signup))

module.exports = router
