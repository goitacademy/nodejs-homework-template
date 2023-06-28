const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');

const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  '/:contactId',
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete('/:contactId', isValidId, ctrl.deleteContact);

module.exports = router;
