const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody, existBody, existBodyFavorite, isValidId } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put(
  '/:contactId',
  isValidId,
  existBody(),
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  existBodyFavorite(),
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
