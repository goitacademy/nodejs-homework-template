const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { schemas } = require('../../models/contact');
const { validateBody, validateFavoriteBody, isValidId, auth } = require('../../middlewares');

router.get('/', auth, ctrl.listContacts);
router.get('/:contactId', auth, isValidId, ctrl.getContactById);
router.put('/:contactId', auth, isValidId, validateBody(schemas.addSchema), ctrl.updateContact);
router.patch(
  '/:contactId/favorite',
  auth,
  isValidId,
  validateFavoriteBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite,
);
router.post('/', auth, validateBody(schemas.addSchema), ctrl.addContact);
router.delete('/:contactId', auth, isValidId, ctrl.removeContact);

module.exports = router;
