const express = require("express");

const contactsScheme = require("../../schemas/contactsScheme.js");
const validateBody = require("../../middlewares/validateBody.js");

const getAll = require("../../controllers/contacts/getAll.js");
const getById = require("../../controllers/contacts/getById.js");
const addContact = require("../../controllers/contacts/addContact.js");
const deleteContact = require("../../controllers/contacts/deleteContact.js");
const updateContact = require("../../controllers/contacts/updateContact.js");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", getById);

router.post("/", validateBody(contactsScheme), addContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", validateBody(contactsScheme), updateContact);

module.exports = router;
