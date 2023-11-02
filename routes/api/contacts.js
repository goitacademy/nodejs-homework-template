const express = require('express');
const controller = require('../../controllers/contacts');
const routerContacts = express.Router();

routerContacts.get('/', controller.listContacts);

//routerContacts.get('/:contactId', controller.getContactById);
routerContacts.get('/:id', controller.getContactById);

routerContacts.post('/', controller.addContact);

routerContacts.delete('/:id', controller.removeContact);

routerContacts.put('/:id', controller.updateContact);

module.exports = routerContacts;
