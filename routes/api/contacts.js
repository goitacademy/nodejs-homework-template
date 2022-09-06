const express = require('express');
// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact
// } = require('../../models/contacts');
const {
  listContactsController,
  getContactByIdController,
  addContactContoller,
  removeContactController,
  updateContactController
} = require('../../controllers/contactsControllers');

const { getContactValidationMiddleware } = require('../../middleware/contactsValidationMiddlware');

const router = express.Router();

router.get('/', listContactsController)

router.get('/:contactId', getContactByIdController)

router.post('/', getContactValidationMiddleware(), addContactContoller)

router.delete('/:contactId', removeContactController)

router.put('/:contactId', getContactValidationMiddleware(), updateContactController)

module.exports = router;
