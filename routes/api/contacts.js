const express = require('express');
const { tryCatchWrapper } = require("../../helpers/error-func");
const {validateBody, contactSchema, updateContactSchema} = require('../../validation/contacts-validation')
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact
} = require("../../controllers/contacts-controller")

const routeContacts = express.Router();

routeContacts.get('/', tryCatchWrapper(getContacts))
routeContacts.get('/:contactId', tryCatchWrapper(getContact))
routeContacts.post('/', validateBody(contactSchema), tryCatchWrapper(createContact))
routeContacts.delete('/:contactId', tryCatchWrapper(deleteContact))
routeContacts.put('/:contactId', validateBody(updateContactSchema), tryCatchWrapper(updateContact))
routeContacts.patch('/:contactId/favorite', tryCatchWrapper(updateStatusContact))

module.exports = routeContacts;

