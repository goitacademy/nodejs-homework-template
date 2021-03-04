const express = require('express')
const router = express.Router()
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
} = require('../../../controllers/contactsControllers')
const {
  addContactValidation,
  findContactByIdValidation,
  updateContactValidation,
  deleteContactValidation
} = require('./contactsValidation')
const guard = require('../../../helpers/guard')

router
  .get('/', guard, getContacts)
  .post('/', guard, addContactValidation, addContact)

router
  .get('/:contactId', guard, findContactByIdValidation, getContactById)
  .patch('/:contactId', guard, updateContactValidation, updateContact)
  .delete('/:contactId', guard, deleteContactValidation, removeContact)

module.exports = router
