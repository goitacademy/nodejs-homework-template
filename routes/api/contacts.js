const express = require('express');

const ctrl = require("../../controllers/contacts");

const {validateBody, isValidId, validateFavoriteStatus} = require("../../middlewares");

const {schemas} = require("../../models/contact");

const router = express.Router();

router.get('/', ctrl.getListContacts);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:id', isValidId, ctrl.removeContact);

router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', isValidId, validateFavoriteStatus, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

module.exports = router;
