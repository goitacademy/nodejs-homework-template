const express = require("express");

const router = express.Router();

const { contacts } = require("../../controllers");

router.get("/", contacts.getAllContacts);
router.get("/:contactId", contacts.getById);
router.post("/", contacts.addContacts);
router.delete("/:contactId", contacts.deleteContacts);
router.put("/:contactId", contacts.updateContacts);

module.exports = router;
