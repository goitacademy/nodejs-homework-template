const express = require("express");
const ControllerContacts = require("../../models/contacts");
const router = express.Router();
const jsonParser = express.json();

// Route Get
router.get("/", ControllerContacts.listContacts);

// Route Get
router.get("/:contactId", ControllerContacts.getContactById);

// Route Post
router.post("/", jsonParser, ControllerContacts.addContact);

// Route Delete
router.delete("/:contactId", ControllerContacts.removeContact);

// Route Update
router.put("/:contactId", jsonParser, ControllerContacts.updateContact);

module.exports = router;
