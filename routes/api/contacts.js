const express = require('express');
const router = express.Router();

const {
  addContactValidation,
  putContactValidation
} = require("../../middlewares/validationMiddleware")
const {
  getContacts,
  getContactsById,
  addContact,
  deleteContact,
  putContacts
} = require("../../controllers/contactsController")

router.get('/', getContacts);
router.get('/:contactId', getContactsById);
router.post('/', addContactValidation, addContact);
router.delete('/:contactId', deleteContact);
router.put('/:contactId', putContactValidation, putContacts);

module.exports = router;
