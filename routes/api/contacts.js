const express = require("express");
const validateBody = require("../../decorators/validateBody");
const schemas = require("../../schemas/contactsSchema");
const contactsControllers = require("../../controllers/contactsControllers");

const router = express.Router();

router.get("/", contactsControllers.listContacts);

router.get("/:contactId", contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", contactsControllers.removeContact);

router.put(
  "/:contactId",
  validateBody(schemas.contactAddSchema),
  contactsControllers.updateContact
);

module.exports = router;
