const express = require("express");
const router = express.Router();
const contactsController = require("../../controller");
const {
  validUpdateContact,
  validCreateContact,
} = require("../../services/validation");

router
  .get("/", contactsController.listContacts)
  .post("/", validCreateContact, contactsController.addContact);

router
  .get("/:contactId", contactsController.getContactById)
  .delete("/:contactId", contactsController.removeContact)
  .patch("/:contactId", validUpdateContact, contactsController.updateContact);

module.exports = router;
