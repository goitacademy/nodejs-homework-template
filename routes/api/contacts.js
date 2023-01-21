const express = require('express');
const {
  postValidation,
  putValidation,
  patchValidation,
} = require('../../validation/schemas/contact');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
} = require('../../controllers/contacts');
const mongoose = require('mongoose');

const contactsRouter = express.Router();

contactsRouter.use('/:contactId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    res.status(400).json({ message: 'id is not valid' });
  } else {
    next();
  }
});

contactsRouter.get('/', listContacts);
contactsRouter.get('/:contactId', getContactById);
contactsRouter.post('/', postValidation, addContact);
contactsRouter.delete('/:contactId', removeContact);
contactsRouter.put('/:contactId', putValidation, updateContact);
contactsRouter.patch('/:contactId', patchValidation, updateContactStatus);

module.exports = contactsRouter;
