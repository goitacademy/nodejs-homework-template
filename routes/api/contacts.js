const express = require('express');
const ctrl = require('../../controllers/contacts');
const router = express.Router();
const { schemas } = require('../../models/contact');
const { validateBody, isValidId } = require('../../middlewares');

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch(
 '/:contactId/favorite',
 isValidId,
 validateBody(schemas.updateFavoriteSchema),
 ctrl.updateFavorite,
);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', isValidId, ctrl.removeContact);

module.exports = router;
