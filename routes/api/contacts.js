const express = require("express");

const ContactsController = require("../../controllers/contact");

const router = express.Router();

const jsonParser = express.json();

router.get("/", ContactsController.getContacts);

router.get("/:id", ContactsController.getContact);

router.post("/", jsonParser, ContactsController.createContact);

router.put("/:id", jsonParser, ContactsController.updateContact);

router.delete("/:id", ContactsController.deleteContact);

router.patch("/:id", jsonParser, ContactsController.updateStatusContact);

module.exports = router;
