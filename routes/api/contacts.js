const express = require('express');

const { validateBody, isValidId, authenticate } = require('../../middlewars');

const router = express.Router();
const ctrl = require('../../сontrollers/contacts');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.add);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteById);

router.put(
  '/:contactId',
  authenticate,
  isValidId,

  validateBody(schemas.addSchema),
  ctrl.updateContactById
);
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,

  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
