const express = require("express");
const contactsController = require("../../controllers/contacts");
const router = express.Router();

router
  .get("/", contactsController.listContacts)
  .get("/:contactId", contactsController.getContactById)
  .post("/", contactsController.addContact)
  .put("/:contactId", contactsController.updateContact)
  .delete("/:contactId", contactsController.removeContact);

module.exports = router;
