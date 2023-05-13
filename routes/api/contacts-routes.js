const express = require("express");

const schemas = require("../../schemas/contacts-schemas");

const { validateBody } = require("../../decorators");

const router = express.Router();

const contactsControllers = require("../../controllers/contacts-conrtoller");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getContactsById);

router.post(
  "/",
  validateBody(schemas.contactsAddSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", contactsControllers.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.contactsAddSchema),
  contactsControllers.updateContact
);

module.exports = router;
