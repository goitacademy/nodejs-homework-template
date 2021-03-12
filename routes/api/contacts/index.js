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

const validation = require('./validation');

router
  .get('/', guard, getAllContact)
  .post('/', guard, validation.createContact, addContact);

router
  .get('/:contactId', guard, validation.id, getContactById)
  .delete('/:contactId', guard, validation.id, removeContact)
  .patch(
    '/:contactId',
    guard,
    validation.id,
    validation.updateContact,
    updateContact,
  );

module.exports = router;
