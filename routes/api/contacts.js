const express = require('express')
const router = express.Router()
const {contacts: ctrl} = require('../../src/controllers')
const {validation, auth} = require('../../src/middlewares')

const {
  addContactJoiSchema,
  updateContactJoiSchema,
  updateContactStatusJoiSchema
} = require('../../models/contactSchema')

router.get('/', ctrl.getAll)

router.get('/:contactId', ctrl.getContact)

router.post('/', auth, validation(addContactJoiSchema), ctrl.addContact)

router.put('/:contactId', validation(updateContactJoiSchema), ctrl.updateContact)

router.patch('/:contactId/favorite', validation(updateContactStatusJoiSchema), ctrl.updateStatus)

router.delete('/:contactId', ctrl.deleteContact)

module.exports = router
