const express = require('express')
const {auth: ctrl} = require('../../src/controllers')
const {validation} = require('../../src/middlewares')
const {
  joiRegisterSchema,
  joiLoginSchema,
} = require('../../models/authSchema')

const router = express.Router()

router.post('/signup', validation(joiRegisterSchema), ctrl.register)

router.post('/login', validation(joiLoginSchema), ctrl.login)

// router.get('/users/logout', validation(updateContactStatusJoiSchema), updateStatus)

// router.get('/users/current', deleteContact)

// router.patch('/users', validation(updateContactStatusJoiSchema), updateStatus)

module.exports = router
