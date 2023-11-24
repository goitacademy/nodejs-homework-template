const express = require("express");
const router = express.Router();
const ContactsController = require("../../controllers/contacts");
const { isValidId, validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

router.get("/", ContactsController.listContacts);

router.get("/:contactId", isValidId, ContactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactsSchema),
  ContactsController.addContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.patchScheme),
  ContactsController.updateStatusContact
);

router.delete("/:contactId", isValidId, ContactsController.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactsSchema),
  ContactsController.updateContact
);

module.exports = router;
