const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");
const {
  validateAddContact,
  validateUpdateContact,
} = require("../../utils/validateBody");

const {
  contactsAddSchema,
  contactsEditSchema,
} = require("../../schemas/contacts");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post(
  "/",
  validateAddContact(contactsAddSchema),
  contactsController.addContact
);

router.delete("/:id", contactsController.deleteContact);

router.put(
  "/:id",
  validateUpdateContact(contactsEditSchema),
  contactsController.updateContact
);

module.exports = router;
