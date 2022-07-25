const express = require("express");
const router = express.Router();
const { contacts } = require("../../controllers");

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getContactById);

router.post("/", contacts.addContact);

router.put("/:contactId", contacts.updateContact);

router.patch("/:id/favorite", contacts.updateStatusContact);

router.delete("/:contactId", contacts.removeContact);

module.exports = router;
