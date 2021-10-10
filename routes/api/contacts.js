const express = require('express');
const ctrlContacts = require('../../controllers/contacts');
const router = express.Router();
const {
  validateContact,
  validateContactPatch,
  validateContactStatusPatch,
  validateContactId,
} = require('./validation');

router.get('/', ctrlContacts.getContacts);

router.get('/:contactId', validateContactId, ctrlContacts.getContact);

router.post('/', validateContact, ctrlContacts.saveContact);

router.delete('/:contactId', validateContactId, ctrlContacts.removeContact);

router.put(
  '/:contactId',
  validateContactId,
  validateContactPatch,
  ctrlContacts.updateContact,
);

router.patch(
  '/:contactId/favorite',
  validateContactId,
  validateContactStatusPatch,
  ctrlContacts.updateStatusFavoriteContact,
);

module.exports = router;
