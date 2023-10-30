const express = require('express');
const controller = require('../../controllers/contacts');
const routerContacts = express.Router();

routerContacts.get('/', controller.listContacts);

//routerContacts.get('/:contactId', controller.getContactById);
routerContacts.get('/:id', controller.getContactById);

routerContacts.post('/', controller.addContact);

routerContacts.delete('/:contactId', controller.removeContact);

routerContacts.put('/:contactId', controller.updateContact);

module.exports = routerContacts;
