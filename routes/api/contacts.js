const express = require('express')
const contactsController = require('../../controllers/contacts.controller')
const { contactValidate } = require('../../middleware/contacts.middleware')

const router = express.Router()

router.get('/', contactsController.getContacts)

router.get('/:contactId', contactsController.getContactById)

router.post('/', contactValidate, contactsController.createContact)

router.delete('/:contactId', contactsController.deleteContactById)

router.put('/:contactId', contactValidate, contactsController.putContact)

router.patch('/:contactId/favorite', contactValidate, contactsController.patchContact)

module.exports = router
