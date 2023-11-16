const express = require("express");
const Ctrl = require("../../controllers/contacts");
const isValidId = require('../../middleware/contacts');
const router = express.Router();
const jsonParser = express.json();

// Route Get
router.get("/", Ctrl.listContacts);

// Route Get
router.get("/:contactId",isValidId, Ctrl.getContactById);

// Route Post
router.post("/", jsonParser, Ctrl.addContact);

// Route Delete
router.delete("/:contactId",isValidId, Ctrl.removeContact);

// Route Update
router.put("/:contactId", isValidId, jsonParser, Ctrl.updateContact);

// Route Patch
router.patch("/:contactId/favorite",isValidId, jsonParser, Ctrl.statusContact)

module.exports = router;