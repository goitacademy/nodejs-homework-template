const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactsController')
const { createContact, updateContact, updateStatus } = require('../../validation/validation')

router.get('/', contactsController.listContacts)

router.get('/:contactId', contactsController.getById)

router.post('/', createContact, contactsController.addContact)

router.delete('/:contactId', contactsController.removeContact)

router.patch('/:contactId', updateContact, contactsController.updateContact)

router.patch('/:contactId/favorite', updateStatus, contactsController.updateStatusContact)

module.exports = router
