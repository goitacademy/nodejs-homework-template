const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validationBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contacts');
const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validationBody(schemas.addSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.removeById);

router.put('/:contactId', isValidId, validationBody(schemas.addSchema), ctrl.updateById);
router.patch(
  '/:contactId',
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
