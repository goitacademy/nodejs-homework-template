const express = require('express')
const router = express.Router()
const contactsControllers = require('../../controllers/contacts')

router.get('/', contactsControllers.getAllContactsController)

router.get('/:contactId',  contactsControllers.getContactByIdController)

router.post('/', contactsControllers.postContactController)

router.delete('/:contactId', contactsControllers.deleteContactController)

router.put('/:contactId', contactsControllers.updateContactByIdController)

router.patch('/:contactId/favorite', contactsControllers.updateFavoriteController)

module.exports = router
