const express = require("express");
const router = express.Router();
const contacts = require("../../controllers");

router.get("/", contacts.getContacts);
router.get("/:contactId", contacts.getContact);
router.post("/", contacts.addContact);
router.delete("/:contactId", contacts.deleteContact);
router.put("/:contactId", contacts.updateContact);
router.patch("/:contactId/favorite", contacts.updateStatusContact);

module.exports = router;
