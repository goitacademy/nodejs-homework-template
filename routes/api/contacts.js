const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactsController')

const guard = require('../../helpers/guard')

const {
  validateAddContact,
  validateUpdateContact,
} = require('../../validation/contactsValidation')

router
  .get('/', guard, contactsController.listContacts)
  .get('/:contactId', guard, contactsController.getContactById)
  .post('/', guard, validateAddContact, contactsController.addContact)
  .delete('/:contactId', guard, contactsController.removeContact)
  .patch(
    '/:contactId',
    guard,
    validateUpdateContact,
    contactsController.updateContact
  )

module.exports = router
