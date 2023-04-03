const express = require("express");
const contactsController = require("../../controllers/contacts/contacts.controller");
const contactsValidator = require("../../middlewares/validator.middleware");

const router = express.Router();

// Get all contacts
router.get("/", contactsController.getAll);

// Get a single contact by id
router.get("/:contactId", contactsController.getById);

// Create a new contact
router.post(
  "/",
  contactsValidator.addValidator,
  contactsController.addNewContact
);

// Delete a contact
router.delete("/:contactId", contactsController.deleteContact);

// Update a contact
router.put(
  "/:contactId",
  contactsValidator.updateValidator,
  contactsController.updateContact
);

module.exports = router;
