const express = require('express');
const {
  addContactValidation,
  updateContactValidation,
} = require('../../src/middlewares/validationMiddleware');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../src/models/contacts');

const router = express.Router();

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', addContactValidation, addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', updateContactValidation, updateContact);

module.exports = router;
