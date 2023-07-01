const express = require('express');

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId } = require('../../middlewares');

const { schema } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schema.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

router.put('/:contactId', isValidId, validateBody(schema.addSchema), ctrl.updateContact);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;