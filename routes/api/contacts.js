const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middleware');
const { schemas } = require('../../models/contacts');
const isBodyEmpty = require('../../middleware/IsBodyEmpty');
const authenticate = require('../../middleware/authenticate');

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
