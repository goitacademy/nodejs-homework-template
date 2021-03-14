const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contacts')
const validation = require('./validation')

router.get('/', contactsController.listContacts)
  .post('/', validation.addContact, contactsController.addContact)

router.get('/:contactId', contactsController.getContactById)
  .delete('/:contactId', contactsController.removeContact)

router.patch('/:contactId', validation.updateContact, contactsController.updateContact,)

module.exports = router
