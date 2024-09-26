const express = require("express");

const contactsController = require("../../controllers/controllers");

const schemas = require("../../schemas/contacts-schema");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.contactSchema),
  contactsController.updateContact
);

module.exports = router;
