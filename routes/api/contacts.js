const express = require('express');
const router = express.Router();
const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middleware');
const { schemas } = require('../../models/contacts');

router.get('/', ctrl.getAllContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put(
  '/:id',
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete('/:id', isValidId, ctrl.deleteContact);

module.exports = router;
