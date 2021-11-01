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
const wrapError = require('../../helpers/errorHandles');

router.get('/', guard, wrapError(ctrlContacts.getContacts));

router.get(
  '/:contactId',
  guard,
  validateContactId,
  wrapError(ctrlContacts.getContact),
);

router.post('/', guard, validateContact, wrapError(ctrlContacts.saveContact));

router.delete(
  '/:contactId',
  guard,
  validateContactId,
  wrapError(ctrlContacts.removeContact),
);

router.put(
  '/:contactId',
  guard,
  validateContactId,
  validateContactPatch,
  wrapError(ctrlContacts.updateContact),
);

router.patch(
  '/:contactId/favorite',
  guard,
  validateContactId,
  validateContactStatusPatch,
  wrapError(ctrlContacts.updateStatusFavoriteContact),
);

module.exports = router;
