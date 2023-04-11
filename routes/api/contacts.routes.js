const express = require("express");
const contactsController = require("../../controllers/contacts/contacts.controller");
const { validator } = require("../../middlewares/index");
const { schemas } = require("../../models/contact");

const router = express.Router();

// Get all contacts
router.get("/", contactsController.getAll);

// Get a single contact by id
router.get("/:contactId", contactsController.getById);

// Create a new contact
router.post(
  "/",
  validator(schemas.addSchema),
  contactsController.addNewContact
);

// Delete a contact
router.delete("/:contactId", contactsController.deleteContact);

// Update a contact
router.put(
  "/:contactId",
  validator(schemas.updateSchema),
  contactsController.updateContact
);

// Update contact status
router.patch(
  "/:contactId/favorite",
  validator(schemas.updateContactStatus),
  contactsController.updateStatusContact
);

module.exports = router;
