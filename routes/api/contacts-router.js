const express = require("express");

const router = express.Router();

const contactsController = require("../../controllers/contacts-controllers");

const { schemas } = require("../../schemas/contacts-schemas");

const { validateBody } = require("../../decorators/validateBody");

router.get("/", contactsController.listContacts);

router.get("/:contactId", contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.delete("/:contactId", contactsController.removeContact);

router.patch(
  "/:contactId/favorite",
  // validateBody(schemas.contactAddSchema),
  contactsController.updateStatusContact
);

module.exports = router;
