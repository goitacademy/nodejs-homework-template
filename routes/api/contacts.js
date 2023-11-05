const express = require('express');
const controller = require('../../controllers/contacts');
const routerContacts = express.Router();

routerContacts.get('/', controller.listContacts);

routerContacts.get('/:id', controller.getContactById);

routerContacts.post('/', controller.addContact);

routerContacts.put('/:id', controller.updateContact);

routerContacts.delete('/:id', controller.removeContact);

module.exports = routerContacts;
