const express = require('express')

const router = express.Router()

const contactsControllers = require('../../controllers/contactsControllers')



router.get('/', contactsControllers.listContacts)

router.get('/:contactId', contactsControllers.getContactById)

router.post('/', contactsControllers.addContact)

router.delete('/:contactId', contactsControllers.removeContact)

router.put('/:contactId', contactsControllers.updateContact)

module.exports = router
