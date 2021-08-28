const express = require("express");
const router = express.Router();
const { joiContactSchema } = require("../../model/contact");
const { validation } = require("../../validation");

const contacts = require("../../controllers");

router.get("/", contacts.getAllContacts);

router.get("/:contactId", contacts.getByIdContact);

router.post("/", validation(joiContactSchema), contacts.addContact);

router.delete("/:contactId", contacts.removeContact);

router.patch("/:contactId", contacts.updateContact);
router.patch("/:contactId/favorite", contacts.updateContactStatus);

module.exports = router;
