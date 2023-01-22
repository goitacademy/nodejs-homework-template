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
const { authorization } = require('../../middleware');
const mongoose = require('mongoose');
const { tryCatchWrapper } = require('../../helpers');

const contactsRouter = express.Router();

contactsRouter.use('/:contactId', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.contactId)) {
    res.status(400).json({ message: 'id is not valid' });
  } else {
    next();
  }
});

contactsRouter.get('/', tryCatchWrapper(authorization), listContacts);
contactsRouter.get('/:contactId', tryCatchWrapper(authorization), getContactById);
contactsRouter.post('/', tryCatchWrapper(authorization), postValidation, addContact);
contactsRouter.delete('/:contactId', tryCatchWrapper(authorization), removeContact);
contactsRouter.put(
  '/:contactId',
  tryCatchWrapper(authorization),
  putValidation,
  updateContact
);
contactsRouter.patch(
  '/:contactId',
  tryCatchWrapper(authorization),
  patchValidation,
  updateContactStatus
);

module.exports = contactsRouter;
