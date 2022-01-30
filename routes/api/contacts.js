const express = require('express');
const contactValidation = require('../../midlewares/validation/contactValidation');
const favoriteValidation = require('../../midlewares/validation/favoriteValidation');

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
  .get('/', getContacts)
  .get('/:contactId', getContactById)
  .post('/', contactValidation, addContact)
  .delete('/:contactId', deleteContact)
  .put('/:contactId', contactValidation, correctContact)
  .patch('/:contactId/favorite', favoriteValidation, updateContact);

module.exports = router;
