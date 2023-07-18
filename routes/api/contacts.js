const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../../controllers/contacts');

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', addContact);

router.patch('/:contactId', updateStatusContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', updateContact);

module.exports = router;
