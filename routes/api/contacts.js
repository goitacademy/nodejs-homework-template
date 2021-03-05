const express = require('express');
const router = express.Router();
const {
  getAllContact,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../controllers/contacts');

const validation = require('./validation');

router.get('/', getAllContact).post('/', validation.createContact, addContact);

router
  .get('/:contactId', validation.id, getContactById)
  .delete('/:contactId', validation.id, removeContact)
  .patch('/:contactId', validation.id, validation.updateContact, updateContact);

module.exports = router;
