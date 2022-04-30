const express = require('express')

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts')

const {
  validateAddedContact,
  validateUpdatedContact,
} = require('../../middlewares/validation');

const router = express.Router()

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validateAddedContact, addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validateUpdatedContact, updateContact)

module.exports = router
