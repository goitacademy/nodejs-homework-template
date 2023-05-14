const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const router = express.Router();

const schema = require("../../schemas/contacts-scheme");

const { validateBody } = require("../../decorators");

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schema.contactSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.deleteContact);

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  contactsController.updateContact
);

module.exports = router;
