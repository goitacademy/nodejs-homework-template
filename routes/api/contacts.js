const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validation, isValid } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', ctrl.getAllContacts);

router.get('/:id', isValid, ctrl.getContactById);

router.post('/', validation(schemas.addSchema), ctrl.addContact);

router.put('/:id', isValid, validation(schemas.addSchema), ctrl.updateContact);

router.patch(
  '/:id/favorite',
  isValid,
  validation(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete('/:id', isValid, ctrl.removeContact);

module.exports = router;
