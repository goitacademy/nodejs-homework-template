const express = require('express');
const router = express.Router();
const { schemas } = require('../../models/contact');

const { contacts: ctrl } = require('../../controllers');
const { auth, validation, ctrlWrapper } = require('../../middlewares');

const validateMiddleware = validation(schemas.contactsSchema);

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', auth, validateMiddleware, ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.deleteById));

router.put('/:contactId', validateMiddleware, ctrlWrapper(ctrl.updateById));

router.patch(
  '/:contactId/favorite',
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
