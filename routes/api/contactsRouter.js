const express = require("express");

const router = express.Router();
const { contactsController } = require("../../controllers");
// const { contactsValidation } = require("../../units");
const { validateFields } = require("../../middleware");
const schema = require("../../validation/schema");

router
  .route("/")
  .get(contactsController.getAllContacts)
  .post(validateFields(schema), contactsController.createContact);

router
  .route("/:contactId")
  .get(contactsController.getById)
  .delete(contactsController.removeContact)
  .put(validateFields(schema), contactsController.updateContact);

module.exports = router;
