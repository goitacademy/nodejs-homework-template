const express = require('express')
const router = express.Router()
const {register, login} = require('../../src/controllers/auth')
const { validation } = require('../../src/middlewares/validationMiddleware')

const {
  joiRegisterSchema,
  joiLoginSchema,
} = require('../../models/authSchema')

router.post('/signup', validation(joiRegisterSchema), register)

router.post('/login', validation(joiLoginSchema), login)

// router.get('/users/logout', validation(updateContactStatusJoiSchema), updateStatus)

// router.get('/users/current', deleteContact)

// router.patch('/users', validation(updateContactStatusJoiSchema), updateStatus)

module.exports = router
