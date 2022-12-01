const express = require('express');
const {contactValidation} = require('../../middlewares/contactsValidation');
const {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
} = require('../../controllers/contactsController');

const router = new express.Router();

router.get('/', listContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', contactValidation, addContactController);

router.delete('/:contactId', removeContactController);

router.put('/:contactId', contactValidation, updateContactController);

module.exports = router;
