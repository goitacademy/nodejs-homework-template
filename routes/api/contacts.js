const express = require('express');

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require('../../controllers');

const {
  validateAddContact,
  validateUpdateContact,
} = require('../../middleware');

router.get('/', getContacts);

router.get('/:id', getContact);

router.post('/', validateAddContact, createContact);

router.put('/:id', validateUpdateContact, updateContact);

router.delete('/:id', deleteContact);

module.exports = router;
