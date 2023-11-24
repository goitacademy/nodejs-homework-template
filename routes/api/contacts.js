const express = require("express");
const Ctrl = require("../../controllers/contacts");
const isValidId = require('../../middleware/validationBody');
const auth = require("../../middleware/user")
const router = express.Router();
const jsonParser = express.json();

// Route Get
router.get("/",auth, Ctrl.listContacts);

// Route Get
router.get("/:contactId",isValidId, auth, Ctrl.getContactById);

// Route Post
router.post("/", jsonParser, auth, Ctrl.addContact);

// Route Delete
router.delete("/:contactId",isValidId, auth, Ctrl.removeContact);

// Route Update
router.put("/:contactId", isValidId, jsonParser, auth, Ctrl.updateContact);

// Route Patch
router.patch("/:contactId/favorite",isValidId, jsonParser, auth, Ctrl.statusContact)

module.exports = router;