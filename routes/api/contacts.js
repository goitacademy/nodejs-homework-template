const express = require('express');

const {
  getContacts,
  getContactDataById,
  addNewContact,
  deleteContactById,
  updateContactById
} = require('../controllers/contactsController');

const {addContactValidation } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getContactDataById);

router.post('/', addContactValidation, addNewContact);

router.delete('/:contactId', deleteContactById);

router.put('/:contactId', addContactValidation, updateContactById )

module.exports = router;
