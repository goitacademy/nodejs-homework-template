const express = require('express')
const router = express.Router()
const contactsController = require('../controllers/contactsController')

router.get('/', contactsController.listContacts)

router.get('/:contactId', contactsController.getContactById)

router.get('/?favorite=true', contactsController.getFavoriteContacts)

router.post('/', contactsController.addContact)

router.delete('/:contactId', contactsController.removeContact)

router.put('/:contactId', contactsController.updateContact)

router.patch('/:contactId', contactsController.updateStatusContact)

module.exports = router
