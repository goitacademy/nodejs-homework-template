const express = require("express");
const router = express.Router();
const controllerContacts = require("../../controllers/contacts");
const {
  validateCreateContacts,
  validateUpdateContacts,
} = require("../../validation/contacts");

router
  .get("/", controllerContacts.getAll)
  .get("/:contactId", controllerContacts.getById)
  .post("/", validateCreateContacts, controllerContacts.create)
  .delete("/:contactId", controllerContacts.remove)
  .patch("/:contactId", validateUpdateContacts, controllerContacts.update);

module.exports = router;
