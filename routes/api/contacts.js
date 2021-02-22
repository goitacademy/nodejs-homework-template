const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactsController')

const {
  validateAddContact,
  validateUpdateContact,
} = require('../../validation/contactsValidation')

router
  .get('/', contactsController.listContacts)
  .get('/:contactId', contactsController.getContactById)
  .post('/', validateAddContact, contactsController.addContact)
  .delete('/:contactId', contactsController.removeContact)
  .patch('/:contactId', validateUpdateContact, contactsController.updateContact)

module.exports = router
