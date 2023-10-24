const express = require('express');

const isValidId = require('../../helpers/isValidId');
const { addScheme, favoriteScheme } = require('../../models/contact');
const validateBody = require('../../helpers/validateBody')

const router = express.Router()

const ctrl = require('../../controllers/contacts')

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(addScheme), ctrl.addContact);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(favoriteScheme),
  ctrl.updateContactFavorite
);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(addScheme),
  ctrl.updateContact
);

module.exports = router;
