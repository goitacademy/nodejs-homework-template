const express = require('express');

const { validation, ctrlWrapper, isValidId } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getById));
router.post('/', validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeById));
router.put('/:contactId', isValidId, validation(joiSchema), ctrlWrapper(ctrl.updateById));
router.patch(
  '/:contactId/favorite',
  isValidId,
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
