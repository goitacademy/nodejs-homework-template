const express = require('express');
const router = express.Router();

const ctrlContacts = require('../../controllers/contacts');
const {
  validateContact,
  validateContactPatch,
  validateContactStatusPatch,
  validateContactId,
} = require('./validation');

const guard = require('../../helpers/guard');

router.get('/', guard, ctrlContacts.getContacts);

router.get('/:contactId', guard, validateContactId, ctrlContacts.getContact);

router.post('/', guard, validateContact, ctrlContacts.saveContact);

router.delete(
  '/:contactId',
  guard,
  validateContactId,
  ctrlContacts.removeContact,
);

router.put(
  '/:contactId',
  guard,
  validateContactId,
  validateContactPatch,
  ctrlContacts.updateContact,
);

router.patch(
  '/:contactId/favorite',
  guard,
  validateContactId,
  validateContactStatusPatch,
  ctrlContacts.updateStatusFavoriteContact,
);

module.exports = router;
