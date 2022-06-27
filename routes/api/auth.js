const express = require('express')
const {auth: ctrl} = require('../../src/controllers')
const {auth, validation} = require('../../src/middlewares')
const {
  joiRegisterSchema,
  joiLoginSchema,
} = require('../../models/authSchema')

const router = express.Router()

router.post('/signup', validation(joiRegisterSchema), ctrl.register)

router.post('/login', validation(joiLoginSchema), ctrl.login)

router.get('/logout', auth, ctrl.logout)

// router.patch('/users', validation(updateContactStatusJoiSchema), updateStatus)

module.exports = router
