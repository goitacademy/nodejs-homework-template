const express = require("express");

const contactsControllers = require("../../controllers/contactsControllers");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsControllers.listContacts);

router.get("/:id", contactsControllers.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsControllers.addContact
);

router.delete("/:id", contactsControllers.removeContact);

router.put(
  "/:id",
  validateBody(schemas.contactAddSchema),
  contactsControllers.updateContactById
);

module.exports = router;
