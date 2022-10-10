const express = require('express');
const { validateBody, ctrlWrapper } = require('../../middlewares');
const { contactsControllers: ctrl } = require('../../controllers');
const { schemas } = require('../../models/contacts');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post(
  '/',
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/:favorite',
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
