const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers');
const { validateBody, isValidId } = require('../../middlewares');
const { addSchema, updateFavoriteSchema } = require('../../schemas/contacts');

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(addSchema), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.deleteById);

router.put('/:contactId', isValidId, validateBody(addSchema), ctrl.updateById);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
