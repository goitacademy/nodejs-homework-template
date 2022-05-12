const express = require('express')
const { ctrlWrapper, validation } = require('../../middlewars')
const { joiSignupSchema } = require('../../models')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup))

module.exports = router
