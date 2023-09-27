const express = require('express');

const ctrl = require('../../controllers/contacts');

const {
  validateBody,
  isValidId,
  checkBody,
  authenticate,
} = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.listContacts);

router.get('/:id', authenticate, isValidId, ctrl.getContactById);

router.post(
  '/',
  authenticate,
  checkBody,
  validateBody(schemas.addSchema),
  ctrl.addContact
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  checkBody,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete('/:id', authenticate, isValidId, ctrl.removeContact);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;