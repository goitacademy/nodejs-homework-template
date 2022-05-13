const express = require('express')

const { ctrlWrapper, validation } = require('../../middlewars')
const { auth: ctrl } = require('../../controllers')
const { joiSignupSchema, joiLoginSchema } = require('../../models/')

const router = express.Router()

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup))
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login))

module.exports = router
