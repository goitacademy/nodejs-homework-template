const express = require("express");
const router = express.Router();
const contactsController = require("../../controller");
const {updateContact, createContact} = require("../../services/validation");

router
  .get("/", contactsController.listContacts)
  .post("/", createContact, contactsController.addContact);

router
  .get("/:contactId", contactsController.getContactById)
  .delete("/:contactId", contactsController.removeContact)
  .patch("/:contactId", updateContact, contactsController.updateContact);

module.exports = router;
