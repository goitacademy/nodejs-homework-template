const express = require("express");
const contacts = require("../../controllers/contacts.js");

const validateBody = require('../../helpers/validateBody.js');
const contactsSchema = require('../../schemas/contact-schema.js');

const contactAddValidate = validateBody(contactsSchema.contactsSchemas);
const favoriteValidate = validateBody(contactsSchema.updateStatusSchema);

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:id", contacts.getContactById);

router.post("/", contactAddValidate, contacts.addContact);

router.delete("/:id", contacts.removeContact);

router.put("/:id", contacts.updateContact);

router.patch("/:id/favorite", favoriteValidate, contacts.updateFavorite);

module.exports = router;
