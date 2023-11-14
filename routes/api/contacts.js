const express = require('express');
const { contactsFunctions } = require('../../controllers/contacts');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  updateStatusContacts,
  removeContact,
} = require('../../controllers/contacts');

const routerContacts = express.Router();

routerContacts.get('/', getContacts);

routerContacts.get('/:id', getContactById);

routerContacts.post('/', createContact);

routerContacts.put('/:id', updateContact);

routerContacts.put('/:id/favorite', updateStatusContacts);

routerContacts.delete('/:id', removeContact);

module.exports = routerContacts;
