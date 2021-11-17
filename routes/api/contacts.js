const express = require("express");
const router = express.Router();
const getContacts = require("../../controllers/contacts/getContacts");
const getOneContact = require("../../controllers/contacts/getOneContact");
const updateOneContact = require("../../controllers/contacts/updateOneContact");
const deleteContact = require("../../controllers/contacts/deleteContact");
const contactAdd = require("../../controllers/contacts/contactAdd");

const { contactsValidation } = require("../../middlewares/validation/contacts");

router.get("/", getContacts);

router.get("/:contactId", getOneContact);

router.post("/", contactsValidation, contactAdd);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId", updateOneContact);

module.exports = router;
