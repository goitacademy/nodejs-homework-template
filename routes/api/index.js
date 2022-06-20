const express = require('express')
const router = express.Router()
const {
  getList,
  getContact,
  addContact,
  updateContact,
  updateStatus,
  deleteContact
} = require('../../src/controllers')
const { validation } = require('../../src/middlewares/validationMiddleware')

const {
  addContactJoiSchema,
  updateContactJoiSchema,
  updateContactStatusJoiSchema
} = require('../../models/contactSchema')

router.get('/', getList)

router.get('/:contactId', getContact)

router.post('/', validation(addContactJoiSchema), addContact)

router.put('/:contactId', validation(updateContactJoiSchema), updateContact)

router.patch('/:contactId/favorite', validation(updateContactStatusJoiSchema), updateStatus)

router.delete('/:contactId', deleteContact)

module.exports = router
