const express = require("express");
const contactsController = require("../../controllers/contacts/contacts.controller");
const { validator, authenticate } = require("../../middlewares/index");
const { schemas } = require("../../models/contact");

const router = express.Router();

// Get all contacts
router.get("/", authenticate, contactsController.getAll);

// Get a single contact by id
router.get("/:contactId", authenticate, contactsController.getById);

// Create a new contact
router.post(
  "/",
  authenticate,
  validator(schemas.addSchema),
  contactsController.addNewContact
);

// Delete a contact
router.delete("/:contactId", authenticate, contactsController.deleteContact);

// Update a contact
router.put(
  "/:contactId",
  authenticate,
  validator(schemas.updateSchema),
  contactsController.updateContact
);

// Update contact status
router.patch(
  "/:contactId/favorite",
  authenticate,
  validator(schemas.updateContactStatus),
  contactsController.updateStatusContact
);

module.exports = router;
