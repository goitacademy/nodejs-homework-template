const express = require('express')
const router = express.Router()
const contactsController = require('../../controllers/contactsController')
console.log(contactsController)
router.get('/', contactsController.listContacts)

router.get('/:contactId', contactsController.getById)

router.post('/', contactsController.addContact)

router.delete('/:contactId', contactsController.removeContact)

router.patch('/:contactId', contactsController.updateContact)

module.exports = router
