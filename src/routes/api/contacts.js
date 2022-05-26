const express = require('express');

const {
  getContacts,
  getOneContact,
  deleteContact,
  addOneContact,
  updateOneContact,
} = require('../../controllers/contactsController');

const { addContactValidation } = require('../../middlewares/validationMiddleware');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getOneContact);

router.delete('/:contactId', deleteContact);

router.post('/', addContactValidation, addOneContact);

router.put('/:contactId', addContactValidation, updateOneContact);

module.exports = router;
