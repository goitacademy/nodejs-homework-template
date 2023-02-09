const express = require('express');

const {
  getContactByIdValidation,
  addContactValidation,
  updateContactValidation,
} = require('../../middlewares/contacts.validation.middleware');
const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
} = require('../../controllers/contacts.controller');

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactByIdValidation, getContactById);
router.post('/', addContactValidation, addContact);
router.delete('/:contactId', getContactByIdValidation, deleteContactById);
router.put('/:contactId', [getContactByIdValidation, updateContactValidation], updateContactById);

module.exports = router;
