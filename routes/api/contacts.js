const express = require('express');
const { contactsFunctions } = require('../../controllers');

const routerContacts = express.Router();

routerContacts.get('/', contactsFunctions.getContacts);

routerContacts.get('/:id', contactsFunctions.getContactById);

routerContacts.post('/', contactsFunctions.createContact);

routerContacts.put('/:id', contactsFunctions.updateContact);

routerContacts.delete('/:id', contactsFunctions.removeContact);

module.exports = routerContacts;
