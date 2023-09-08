const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrl.getContacts);

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
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.delete('/:id', authenticate, isValidId, ctrl.deleteContact);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
