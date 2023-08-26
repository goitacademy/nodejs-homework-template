const express = require('express');
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const {validateBody, isValidId} = require("../../middlewapres");
const {schemas} = require("../../models/cotact");

router.get('/', ctrl.listContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSсhema), ctrl.addContact);

router.delete('/:contactId', isValidId,  ctrl.removeContact); 

router.put('/:contactId', isValidId, validateBody(schemas.addSсhema), ctrl.updateContact);

router.patch('/:contactId/favorite', isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router;
