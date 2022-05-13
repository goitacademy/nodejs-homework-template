const express = require('express')

const { ctrlWrapper, validation, auth } = require('../../middlewars')
const { auth: ctrl } = require('../../controllers')
const { joiSignupSchema, joiLoginSchema } = require('../../models/')

const router = express.Router()

router.post('/signup', validation(joiSignupSchema), ctrlWrapper(ctrl.signup))
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login))
router.get('/logout', auth, ctrlWrapper(ctrl.logout))
router.get('/current', auth, ctrlWrapper(ctrl.getCurrent))
module.exports = router
