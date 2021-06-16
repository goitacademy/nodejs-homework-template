const express = require('express');
const router = express.Router();
const {
  changeContact,
  addNewContact,
  deleteContact,
  getById,
  getContacts,
} = require('../../controllers/contactsСontroller');

router.get('/', getContacts);

router.get('/:contactId', getById);

router.post('/', addNewContact);

router.delete('/:contactId', deleteContact);

router.patch('/:contactId', changeContact);

module.exports = { contactsRouter: router };
