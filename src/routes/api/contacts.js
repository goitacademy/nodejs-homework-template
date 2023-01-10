const express = require('express');
const { addContactValidation } = require('../../middlewares/validationMiddleware');
const {
  getContacts,
  getOneContactById,
  addNewContact,
  deleteContact,
  changeOldContact,
} = require('../../controllers/contactsController');

const router = express.Router();

router.get('/', getContacts);

router.get('/:contactId', getOneContactById);

router.post('/', addContactValidation, addNewContact);

router.delete('/:contactId', deleteContact);

router.put('/:contactId', addContactValidation, changeOldContact);

module.exports = router;
