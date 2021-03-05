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
  .get('/:contactId', getContactById)
  .delete('/:contactId', removeContact)
  .patch('/:contactId', validation.updateContact, updateContact);

module.exports = router;
