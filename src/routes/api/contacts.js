const express = require("express");
const contactsController = require("../../controllers/contacts");
const {
  validateContactsCreate,
  validateContactsUpdate,
} = require("../../validator/contacts");

const router = express.Router();

router
  .get("/", contactsController.listContacts)
  .get("/:contactId", contactsController.getContactById)
  .post("/", validateContactsCreate, contactsController.addContact)
  .put("/:contactId", validateContactsUpdate, contactsController.updateContact)
  .delete("/:contactId", contactsController.removeContact);

module.exports = router;
