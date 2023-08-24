const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getByIdContact);

router.post('/', validateBody(schemas.contactJoiSchema), ctrl.postContact);

router.delete('/:contactId', isValidId, ctrl.deleteContact);

router.put('/:contactId', isValidId, validateBody(schemas.contactJoiSchema), ctrl.putContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.patchContact);

module.exports = router;