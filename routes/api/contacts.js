const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts-controller");
const validate = require("./validation");

router
  .get("/", contactsController.getContacts)
  .post("/", validate.addContact, contactsController.createContact);

router
  .get("/:contactId", contactsController.getContactById)
  .delete("/:contactId", contactsController.removeContact)
  .patch(
    "/:contactId",
    validate.updateContact,
    contactsController.updateContact
  );

module.exports = router;
