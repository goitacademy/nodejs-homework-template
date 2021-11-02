const express = require('express')
const router = express.Router()
const contactsControllers = require('../../controllers/contacts')

router.get('/', contactsControllers.getAllContactsCtrl)

router.get('/:contactId', contactsControllers.getContactByIdCtrl)

router.post('/', contactsControllers.addContactCtrl)

router.delete('/:contactId', contactsControllers.removeContactCtrl)

// router.patch('/:contactId', contactsControllers.updateContactCtrl)

module.exports = router
