const express = require('express')
const router = express.Router()
const contactsController = require('../../controller/contactsController.js')

router.get('/', contactsController.listContacts)
router.get('/:id', contactsController.getContactById)
router.put('/:id', contactsController.updateContact)
router.post('/', contactsController.addContact)
router.delete('/:id', contactsController.removeContact)
router.patch('/:id/favorite', contactsController.updateContactStatus)

module.exports = router
