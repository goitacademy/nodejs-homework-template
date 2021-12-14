const express = require('express');
const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema, favoriteJoiSchema } = require('../../models');
const validateMiddleware = validation(joiSchema);

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', ctrlWrapper(ctrl.getById));
router.post('/', validateMiddleware, ctrlWrapper(ctrl.add));
router.delete('/:contactId', ctrlWrapper(ctrl.deleteById));
router.put('/:contactId', ctrlWrapper(ctrl.updateById));
router.patch(
  '/:contactId/favorite',
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite),
);

module.exports = router;
