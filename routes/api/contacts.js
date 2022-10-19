const express = require('express');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');
const { contacts: contactsCtrl } = require('../../controllers');

const router = express.Router();

router.get('/', ctrlWrapper(contactsCtrl.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(contactsCtrl.getById));

router.post(
  '/',
  validateBody(schemas.addSchema),
  ctrlWrapper(contactsCtrl.add)
);

router.delete('/:contactId', isValidId, ctrlWrapper(contactsCtrl.remove));

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(contactsCtrl.update)
);

router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updateStatusContactSchema),
  ctrlWrapper(contactsCtrl.updateStatusContact)
);

module.exports = router;
