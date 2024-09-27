const express = require("express");
const ControllerContacts = require("../../models/contacts");
const router = express.Router();
const jsonParser = express.json();
const isValidId = require('../../Middlewares/middlewares');

// Route Get
router.get("/", ControllerContacts.listContacts);

// Route Get
router.get("/:contactId",isValidId, ControllerContacts.getContactById);

// Route Post
router.post("/", jsonParser, ControllerContacts.addContact);

// Route Delete
router.delete("/:contactId",isValidId, ControllerContacts.removeContact);

// Route Update
router.put("/:contactId", isValidId, jsonParser, ControllerContacts.updateContact);

// Route Patch
router.patch("/:contactId/favorite",isValidId, jsonParser, ControllerContacts.statusContact)

module.exports = router;
