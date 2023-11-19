const express = require("express");
const crypto = require("crypto");

const router = express.Router();
const jsonParser = express.json();

const ContactController = require("../controllers/contacts");

router.get("/", ContactController.getContacts);

router.get("/:contactId", ContactController.getContact);

router.post("/", jsonParser, ContactController.createContact);

router.delete("/:contactId", ContactController.deleteContact);

router.put("/:contactId", jsonParser, ContactController.updateContact);

router.patch("/:contactId", ContactController.updateStatusContact);

module.exports = router;
