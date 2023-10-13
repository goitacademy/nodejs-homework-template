const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

const router = express.Router();

router.get('/', ctrl.getAll);

router.get('/:contactId', isValidId, ctrl.getById);

router.post('/', validateBody(schemas.add), ctrl.add);

router.delete('/:contactId', isValidId, ctrl.deleteById);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.update),
  ctrl.updateById
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavorite),
  ctrl.updateFavorite
);

module.exports = router;
