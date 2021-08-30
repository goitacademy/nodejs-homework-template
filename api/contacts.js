const express = require("express");

const { contacts: ctrl } = require("../controllers");
// const { validation } = require("../../middleware/validateContact.js");

const router = express.Router();

router.get("/", ctrl.listContacts);
router.get("/:contactId", ctrl.getById);
router.delete("/:contactId", ctrl.removeContact);
router.post("/", ctrl.addContact);
router.patch("/:contactId", ctrl.updateContact);
router.patch("/:contactId/favorite", ctrl.updateField);

module.exports = router;
