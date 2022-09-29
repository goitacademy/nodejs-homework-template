const express = require('express')

const router = express.Router()

const contactsControllers = require('../../controllers/contactsControllers')
const isValidId = require("../../middlewares/isValidId");


router.get('/', contactsControllers.listContacts)

router.get('/:contactId',isValidId, contactsControllers.getContactById)

router.post('/', contactsControllers.addContact)

router.delete('/:contactId', isValidId, contactsControllers.removeContact)

router.put('/:contactId', isValidId, contactsControllers.updateContact)

router.patch('/:contactId/favorite', isValidId, contactsControllers.updateFavorite)

module.exports = router
