const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId, authenticate } = require('../../middlewars');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrlWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post('/', authenticate, validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
