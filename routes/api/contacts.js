const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');

const {
  validateBody,
  isValidId,
  authenticate,
  isBodyEmpty,
} = require('../../middleware');
const { schemas } = require('../../models/contacts');

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  isBodyEmpty,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteContact);

module.exports = router;
