const express = require('express');
const ctrl = require('../../controllers/contacts');
const { authenticate, validationBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contacts');
const router = express.Router();

router.get('/', authenticate, ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', authenticate, validationBody(schemas.addSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.removeById);

router.put('/:contactId', isValidId, validationBody(schemas.addSchema), ctrl.updateById);
router.patch(
  '/:contactId',
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
