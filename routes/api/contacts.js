const express = require('express');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const router = express.Router();

router.get('/', listContacts);

router.get('/:id', getContactById);

router.post('/', addContact);

router.delete('/:id', removeContact)

router.put('/:id', updateContact);
  
module.exports = router
