const express = require("express");
const router = express.Router();
const contactsController = require("../../helpers/contacts");
const validate = require("./validation.js");

router.get("/", contactsController.getContactsList);

router.get("/:contactId", contactsController.getContactById);

router.post("/", validate.createContact, contactsController.addContact);

router.delete("/:contactId", contactsController.removeContact);

router.patch(
  "/:contactId",
  validate.updateContact,
  contactsController.updateContact
);

module.exports = router;
