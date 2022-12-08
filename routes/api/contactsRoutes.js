/* eslint-disable linebreak-style */
const express = require('express');
const {contactValidation} = require('../../middlewares/contactsValidation');
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateContactStatusController,
} = require('../../controllers/contactsController');

const router = new express.Router();

router.get('/', getContactsController);

router.get('/:contactId', getContactByIdController);

router.post('/', contactValidation, addContactController);

router.delete('/:contactId', removeContactController);

router.put('/:contactId', contactValidation, updateContactController);

router.patch('/:contactId/favorite', updateContactStatusController);

module.exports = router;
