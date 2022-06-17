const express = require('express')
const router = express.Router()
const {
  getList,
  getContact,
  addContact,
  updateContactController,
  deleteContact
} = require('../../src/controllers')
const { validation } = require('../../src/middlewares/validationMiddleware')

const {
  addContactJoiSchema,
  updateContactJoiSchema
} = require('../../models/contactSchema')

router.get('/', getList)

router.get('/:contactId', getContact)

router.post('/', validation(addContactJoiSchema), addContact)

router.put('/:contactId', validation(updateContactJoiSchema), updateContactController)

router.delete('/:contactId', deleteContact)

module.exports = router
