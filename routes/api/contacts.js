const express = require("express");
const contacts = require("../../controllers/contacts.js");

const validateBody = require('../../helpers/validateBody.js');
const contactsSchema = require('../../schemas/contact-schema.js');

const contactAddValidate = validateBody(contactsSchema.contactsSchemas);
const favoriteValidate = validateBody(contactsSchema.updateStatusSchema);

const validateId = require('../../helpers/validateId.js');

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:id", validateId, contacts.getContactById);

router.post("/", contactAddValidate, contacts.addContact);

router.delete("/:id", validateId, contacts.removeContact);

router.put("/:id", contacts.updateContact);

router.patch("/:id/favorite", validateId, favoriteValidate, contacts.updateFavorite);

module.exports = router;
