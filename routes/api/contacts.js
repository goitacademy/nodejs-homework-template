const express = require('express')
const validationMiddleware = require('../../middleware/validationMiddleware')
const {
  getAllContacts, getContactById,addContact, delContactById, updateContactById
} = require('../../controllers/contactsController')

const router = express.Router()

router.get('/', getAllContacts)

router.get('/:contactId', getContactById)

router.post('/', validationMiddleware.addContact, addContact)

router.delete('/:contactId', delContactById)

router.put('/:contactId', validationMiddleware.updateContact, updateContactById)

module.exports = router
