const express = require("express");
const router = express.Router();
const contactsController = require("../../../controllers/contactsController");
const validate = require("./validation.js");
const guard = require("../../../helpers/guard");

router
  .get("/", guard, contactsController.getAll)
  .post("/", guard, validate.addContact, contactsController.addContact);

router
  .get("/:contactId", guard, contactsController.getById)
  .delete("/:contactId", guard, contactsController.deleteContact)
  .patch(
    "/:contactId",
    guard,
    validate.updateContact,
    contactsController.updateContact
  );

module.exports = router;
