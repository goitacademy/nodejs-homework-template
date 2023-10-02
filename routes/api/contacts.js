const express = require('express');
const contactsCtrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../schemas/contacts");

const router = express.Router();

router.get('/', authenticate, contactsCtrl.listContacts);

router.get('/:id', authenticate, isValidId, contactsCtrl.getContactById);

router.post('/', authenticate, validateBody(schemas.contactsAddSchema), contactsCtrl.addContact);

router.delete('/:id', authenticate, isValidId, contactsCtrl.removeContact);

router.put('/:id', authenticate, isValidId, validateBody(schemas.contactsAddSchema), contactsCtrl.updateContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(schemas.contactUpdateFavoriteSchema), contactsCtrl.updateFavorite);

module.exports = router;
