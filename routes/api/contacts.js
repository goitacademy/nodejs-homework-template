const express = require('express')
const router = express.Router()
const { getContacts, getContactById, addContact, removeContact, updateContact } = require('../../controllers/contactsControllers')
const { addContactValidation, findContactByIdValidation, updateContactValidation, deleteContactValidation } = require('./validation')

router
  .get('/', getContacts)
  .post('/', addContactValidation, addContact)

router
  .get('/:contactId', findContactByIdValidation, getContactById)
  .patch('/:contactId', updateContactValidation, updateContact)
  .delete('/:contactId', deleteContactValidation, removeContact)

module.exports = router
