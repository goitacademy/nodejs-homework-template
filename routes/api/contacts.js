const express = require('express');
const contactsCtrl = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../schemas/contacts");

const router = express.Router();

router.get('/', contactsCtrl.listContacts);

router.get('/:id', isValidId, contactsCtrl.getContactById);

router.post('/', validateBody(schemas.contactsAddSchema), contactsCtrl.addContact);

router.delete('/:id', isValidId, contactsCtrl.removeContact);

router.put('/:id', isValidId, validateBody(schemas.contactsAddSchema), contactsCtrl.updateContact);

router.patch("/:id/favorite", isValidId, validateBody(schemas.contactUpdateFavoriteSchema), contactsCtrl.updateFavorite);

module.exports = router;
