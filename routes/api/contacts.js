const express = require('express');
const contactValidation = require('../../midlewares/validation/contactValidation');
const favoriteValidation = require('../../midlewares/validation/favoriteValidation');
const authenticate = require('../../midlewares/authenticate');

const {
  getContacts,
  addContact,
  getContactById,
  deleteContact,
  correctContact,
  updateContact,
} = require('../../controllers/contacts');
const router = express.Router();

router
  .get('/', authenticate, getContacts)
  .get('/:contactId', getContactById)
  .post('/', authenticate, contactValidation, addContact)
  .delete('/:contactId', deleteContact)
  .put('/:contactId', contactValidation, correctContact)
  .patch('/:contactId/favorite', favoriteValidation, updateContact);

module.exports = router;
