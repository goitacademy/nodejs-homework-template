const express = require('express');

const { validation, ctrlWrapper, isValidId, authenticate } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));
router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));
router.post('/', authenticate, validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeById));
router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;