const express = require("express");
const contacts = require("../../models/contacts");
const requestError = require("../../helpers/requestError");
const router = express.Router();
const contactsController = require('../../controllers/contacts')

router.get("/", contactsController.listContacts);

router.get("/:contactId",contactsController.getContactById);

router.post("/", contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.put("/:id", contactsController.updateContact);

module.exports = router;
