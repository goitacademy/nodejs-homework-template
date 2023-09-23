const express = require('express');
const contacts = require("../../controllers/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get('/', contacts.listContacts);

router.get('/:id', isValidId, contacts.getContactById);

router.post('/', validateBody(schemas.contactsAddSchema), contacts.addContact);

router.delete('/:id', isValidId, contacts.removeContact);

router.put('/:id', isValidId, validateBody(schemas.contactsAddSchema), contacts.updateContact);

router.patch("/:id/favorite", isValidId, validateBody(schemas.contactUpdateFavoriteSchema), contacts.updateFavorite);

module.exports = router;
