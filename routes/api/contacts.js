const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contactsController");
const validate = require("./validation.js");

router
  .get("/", contactsController.getAll)
  .post("/", validate.addContact, contactsController.addContact);

router
  .get("/:contactId", contactsController.getById)
  .delete("/:contactId", contactsController.deleteContact)
  .patch(
    "/:contactId",
    validate.updateContact,
    contactsController.updateContact
  );

module.exports = router;
