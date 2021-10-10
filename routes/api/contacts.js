const express = require("express");
const router = express.Router();

const ContactsController = require("../../controllers/contacts.controller");
const { validateContact, validateId } = require("./validation");

router.get("/", ContactsController.getAllContacts);

router.get("/:contactId", validateId, ContactsController.getContactById);

router.post("/", validateContact, ContactsController.addNewContact);

router.delete("/:contactId", validateId, ContactsController.removeContact);

router.put(
  "/:contactId",
  validateId,
  validateContact,
  ContactsController.fullUpdateContact
);

router.patch(
  "/:contactId",
  validateId,
  ContactsController.partialUpdateContact
);

module.exports = router;
