const express = require('express');
const router = express.Router();

const {
  patchContactValidation,
  addContactValidation,
} = require('../../middlewares/validationMiddleware');

const {
  changeContact,
  addNewContact,
  deleteContact,
  getById,
  getContacts,
} = require('../../controllers/contactsСontroller');

router.get('/', getContacts);

router.get('/:contactId', getById);

router.post('/', addContactValidation, addNewContact);

router.delete('/:contactId', deleteContact);

router.patch('/:contactId', patchContactValidation, changeContact);

module.exports = { contactsRouter: router };
