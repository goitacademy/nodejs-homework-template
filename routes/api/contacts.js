const express = require('express');
const contactRequest = require("../../models/contacts");
const router = express.Router()
const { validateBody } = require("../../middleware");
const { schemas } = require('../../models/contactsSchema');

router.get('/', contactRequest.listContacts);

router.get('/:contactId', contactRequest.getContactById);

router.post("/", validateBody(schemas.addSchema), contactRequest.addContact);

router.delete("/:contactId", contactRequest.removeContact);

router.put('/:contactId', validateBody(schemas.addSchema), contactRequest.updateContact);

router.patch("/:contactId/favorite", validateBody(schemas.changeFavoriteSchema), contactRequest.updateFavorite);

module.exports = router;
