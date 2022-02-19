const express = require('express');
const router = new express.Router();

const {
  schemaCreateContact,
  schemaUpdateContact,
} = require('./contactsValidationSchemes');

const {
  getContacts,
  getContactById,
  addContact,
  putContact,
  patchContact,
  deleteContact,
} = require('../../controllers/contacts');

const { validateBody } = require('../../middlewares/validateBody');

router
  .get('/', getContacts)
  .post('/', validateBody(schemaCreateContact), addContact);

router
  .get('/:contactId', getContactById)
  .put('/:contactId', validateBody(schemaUpdateContact), putContact)
  .patch('/:contactId', validateBody(schemaUpdateContact), patchContact)
  .delete('/:contactId', deleteContact);

module.exports = router;
