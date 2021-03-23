const express = require('express');
const router = express.Router();
const guard = require('../../../helpers/guard');
const {
  getAllContact,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../../controllers/contacts');

const { createContact, id, updateContactVal } = require('./validation');

router
  .get('/', guard, getAllContact)
  .post('/', guard, createContact, addContact);

router
  .put('/:contactId', guard, id, updateContactVal, updateContact)
  .get('/:contactId', guard, id, getContactById)
  .delete('/:contactId', guard, id, removeContact);

module.exports = router;
