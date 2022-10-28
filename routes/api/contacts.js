const express = require('express');
const {
  validateBody,
  ctrlWrapper,
  authenticate,
} = require('../../middlewares');
const { contactsControllers: ctrl } = require('../../controllers');
const { schemas } = require('../../models/contacts');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, ctrlWrapper(ctrl.getById));

router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.delete(
  '/:contactId',
  authenticate,
  ctrlWrapper(ctrl.removeById)
);

router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/:favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
