const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { schemas } = require('../../models/contact');
const { validateBody, validateFavoriteBody, isValidId } = require('../../middlewares');

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
 '/:contactId/favorite',
 isValidId,
 validateFavoriteBody(schemas.updateFavoriteSchema),
 ctrl.updateFavorite,
);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

module.exports = router;
