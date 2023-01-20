const express = require('express');
const {
  postValidation,
  putValidation,
  patchValidation,
} = require('../../validation/schemas/contacts');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require('../../controllers/contacts');
const mongoose = require('mongoose');

const routerContacts = express.Router();

routerContacts.use('/:contactId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    res.status(400).json({ message: 'id is not valid' });
  } else {
    next();
  }
});

routerContacts.get('/', listContacts);
routerContacts.get('/:contactId', getContactById);
routerContacts.post('/', postValidation, addContact);
routerContacts.delete('/:contactId', removeContact);
routerContacts.put('/:contactId', putValidation, updateContact);
routerContacts.patch('/:contactId', patchValidation, updateContactStatus);

module.exports = routerContacts;
