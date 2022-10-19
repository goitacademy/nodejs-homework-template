const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, authenticate } = require('../../middlewars');
const router = express.Router();
const { schemas } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

// виклик списку контактів
router.get('/', authenticate, ctrlWrapper(ctrl.listContacts));

// виклик контакта по id
router.get('/:contactId', authenticate, ctrlWrapper(ctrl.getContactById));

// запис нового контакта
router.post(
  '/',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContact)
);

// видалення контакта
router.delete('/:contactId', authenticate, ctrlWrapper(ctrl.removeContact));

// зміна контакта
router.put(
  '/:contactId',
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

// зміна окремого поля контакта
router.patch(
  '/:contactId/favorite',
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
