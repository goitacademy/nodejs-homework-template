const express = require('express');
const router = express.Router();
const ContactsCtrl = require('../../controllers/contacts.js');
const { 
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  validateMongoId
} = require('../../validation/contactsValidation.js');

router.get('/', ContactsCtrl.getAllContacts);

router.get('/:contactId',validateMongoId, ContactsCtrl.getContactById);

router.post('/', validateCreateContact, ContactsCtrl.addContact);

router.delete('/:contactId',validateMongoId, ContactsCtrl.removeContact);

router.put('/:contactId', validateMongoId, validateUpdateContact, ContactsCtrl.updateContact);

router.patch('/:contactId/favorite', validateMongoId, validateUpdateStatusContact, ContactsCtrl.updateStatusContact);

module.exports = router;
