const express = require('express')
const router = express.Router()
const {
  addContact,
  updateContact,
  updateStatus,
  deleteContact
} = require('../../src/controllers/auth')
const { validation } = require('../../src/middlewares/validationMiddleware')

const {
  joiRegisterSchema,
  joiLoginSchema,
} = require('../../models/authSchema')

router.post('/users/signup', validation(joiRegisterSchema), addContact)

router.post('/users/login', validation(joiLoginSchema), updateContact)

router.get('/users/logout', validation(updateContactStatusJoiSchema), updateStatus)

router.get('/users/current', deleteContact)

router.patch('/users', validation(updateContactStatusJoiSchema), updateStatus)

module.exports = router
