const express = require('express');
const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../utils');
const { validation, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));
router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));
router.post("/", validation(schemas.newContactSchema), ctrlWrapper(ctrl.addContact));
router.put('/:contactId', isValidId, validation(schemas.updateContactSchema), ctrlWrapper(ctrl.updateContact));
router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.removeContact));
router.patch('/:contactId/favorite', isValidId, validation(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;