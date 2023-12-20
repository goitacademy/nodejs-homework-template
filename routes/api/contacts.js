const express = require("express");
const contactsControllers = require("../../controllers/contacts");
const { validateContactBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post(
  "/",
  validateContactBody(schemas.addContactSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", contactsControllers.deleteContact);

router.put(
  "/:contactId",
  validateContactBody(schemas.addContactSchema),
  contactsControllers.updateContact
);

module.exports = router;