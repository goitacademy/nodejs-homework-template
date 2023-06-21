const express = require('express');

const { validateBody, isValidId } = require('../../middlewares');

const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { schemas } = require('../../models/contact');

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.addSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.deleteById);

router.put(
  '/:contactId',
  isValidId,

  validateBody(schemas.addSchema),
  ctrl.updateContactById
);

router.patch(
  '/:contactId/favorite',
  isValidId,

  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;