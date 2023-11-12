const express = require("express");
const crypto = require("crypto");

const router = express.Router();
const jsonParser = express.json();

const ContactController = require("../controllers/contacts");

//Get contacts
router.get("/", ContactController.getContacts);

// Get by by contactId
router.get("/:contactId", ContactController.getContact);

//Create a contact
router.post("/", jsonParser, ContactController.createContact);

// Delete contact
router.delete("/:contactId", ContactController.deleteContact);

//Update contact
router.put("/:contactId", jsonParser, ContactController.updateContact);

// Update
router.patch("/:contactId", ContactController.updateStatusContact);

module.exports = router;
