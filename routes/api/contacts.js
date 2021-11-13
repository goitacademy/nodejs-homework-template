const express = require('express')
const router = express.Router()
const contactsControllers = require('../../controllers/contacts')

const {authenticate}=  require('../../middlewares')

router.get('/', authenticate, contactsControllers.getAllContactsController)

router.get('/:contactId', authenticate,  contactsControllers.getContactByIdController)

router.post('/', authenticate, contactsControllers.postContactController)

router.delete('/:contactId', authenticate, contactsControllers.deleteContactController)

router.put('/:contactId', authenticate, contactsControllers.updateContactByIdController)

router.patch('/:contactId/favorite', authenticate, contactsControllers.updateFavoriteController)

module.exports = router
