const express = require('express');
const { contactsFunctions } = require('../../controllers/contacts');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
} = require('../../controllers/contacts');

const routerContacts = express.Router();

routerContacts.get('/', getContacts);

routerContacts.get('/:id', getContactById);

routerContacts.post('/', createContact);

routerContacts.put('/:id', updateContact);

routerContacts.delete('/:id', removeContact);

module.exports = routerContacts;
