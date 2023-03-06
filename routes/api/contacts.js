const express = require("express");

const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", contacts.getAll);

router.get("/:contactId", contacts.getById);

router.post("/", contacts.addContact);

router.delete("/:contactId", contacts.deleteContact);

router.put("/:contactId", contacts.updateContact);

module.exports = router;
