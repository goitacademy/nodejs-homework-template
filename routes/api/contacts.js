const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

const validateBody = require("../../midlleware/validateBody");

const schemas = require("../../schemas/contacts");

router.get("/",  contacts.listContacts);

router.get("/:contactId", contacts.getContactById);

router.post("/", validateBody(schemas.addSchema), contacts.addContact);

router.delete("/:contactId",  contacts.removeContact);

router.put("/:contactId", validateBody(schemas.addSchemaPut), contacts.updateContact);

module.exports = router;
