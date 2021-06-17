const express = require('express');
const router = express.Router();
const ContactsCtrl = require('../../controllers/contacts.js');
const guard = require('../../helpers/guard');

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateMongoId
} = require('../../validation/contactsValidation.js');

router.get('/', guard, ContactsCtrl.getAllContacts);

router.get('/:contactId', guard, validateMongoId, ContactsCtrl.getContactById);

router.post('/', guard, validateCreateContact, ContactsCtrl.addContact);

router.delete('/:contactId', guard, validateMongoId, ContactsCtrl.removeContact);

router.put('/:contactId', guard, validateMongoId, validateUpdateContact, ContactsCtrl.updateContact);

router.patch('/:contactId/favorite', guard, validateMongoId, validateUpdateStatusContact, ContactsCtrl.updateStatusContact);

module.exports = router;
