const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewars');
const router = express.Router();
const { schemas } = require('../../models/contact');
const { ctrlWrapper } = require('../../helpers');

// виклик списку контактів
router.get('/', ctrlWrapper(ctrl.listContacts));

// виклик контакта по id
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

// запис нового контакта
router.post('/', validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

// видалення контакта
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

// зміна контакта
router.put(
  '/:contactId',
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContact)
);

// зміна окремого поля контакта
router.patch(
  '/:contactId/favorite',
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
