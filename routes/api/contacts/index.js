const express = require("express");
const router = express.Router();
const contactsController = require("../../../controllers/contacts-controller");
const validate = require("./validation");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, contactsController.getContacts)
  .post("/", guard, validate.addContact, contactsController.createContact);

router
  .get("/:contactId", guard, contactsController.getContactById)
  .delete("/:contactId", guard, contactsController.removeContact)
  .patch(
    "/:contactId",
    guard,
    validate.updateContact,
    contactsController.updateContact
  );

module.exports = router;
