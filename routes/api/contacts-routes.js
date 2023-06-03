const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:id", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactsAddSchema),
  contactsController.addContact
);

router.put(
  "/:id",
  validateBody(schemas.contactsAddSchema),
  contactsController.updateContactById
);

router.delete("/:id", contactsController.deleteContact);

module.exports = router;
