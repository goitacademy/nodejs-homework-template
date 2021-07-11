const express = require('express')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../model');

router.get('/api/contacts', listContacts);

router.get('/api/contacts/:contactId', getContactById);

router.post('/api/contacts', addContact);

router.delete('/api/contacts/:contactId', removeContact);

router.put('/api/contacts/:contactId', updateContact);

module.exports = router
