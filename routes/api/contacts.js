const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { ctrlWrapper } = require('../../helpers');
const { validateBody } = require('../../middlewars');
const { addSchema } = require('../../schemas/contacts');

// виклик списку контактів
router.get('/', ctrlWrapper(ctrl.listContacts));

// виклик контакта по id
router.get('/:contactId', ctrlWrapper(ctrl.getContactById));

// запис нового контакта
router.post('/', validateBody(addSchema), ctrlWrapper(ctrl.addContact));

// видалення контакта
router.delete('/:contactId', ctrlWrapper(ctrl.removeContact));

// зміна контакта
router.put(
  '/:contactId',
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
