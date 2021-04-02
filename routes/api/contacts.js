const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactsController')
const { createContact, updateContact } = require('../../validation/validation')
router.get('/', contactsController.listContacts)

router.get('/:contactId', contactsController.getById)

router.post('/', createContact, contactsController.addContact)

router.delete('/:contactId', contactsController.removeContact)

router.patch('/:contactId', updateContact, contactsController.updateContact)

module.exports = router
