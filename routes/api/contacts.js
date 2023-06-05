const express = require("express");

const contactsController = require("../../controllers/contacts-controller");

const schemas = require("../../schemas/contacts");

const { validateBody } = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", contactsController.removeContactById);

router.put(
  "/:contactId",
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

module.exports = router;
