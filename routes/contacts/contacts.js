const express = require('express');
const router = express.Router();
const {
  getContactsList,
  getContact,
  createContact,
  removeContact,
  updateContact,
  updateStatusFavorite,
} = require('../../controllers/contacts');
const {
  validateContact,
  validateStatusContact,
  validateId,
} = require('./validation');
const guard = require('../../helpers/guard');
const wrapError = require('../../helpers/errorHandler');

router.get('/', guard, wrapError(getContactsList));

router.get('/:contactId', guard, validateId, wrapError(getContact));

router.post('/', guard, validateContact, wrapError(createContact));

router.delete('/:contactId', guard, validateId, wrapError(removeContact));

router.put(
  '/:contactId',
  guard,
  [validateId, validateContact],
  wrapError(updateContact),
);

router.patch(
  '/:contactId/favorite/',
  guard,
  [validateId, validateStatusContact],
  wrapError(updateStatusFavorite),
);

module.exports = router;
