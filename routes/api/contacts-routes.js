const express = require("express");

const { schemas } = require("../../models/contact");

const { validateBody, isValidId } = require("../../decorators");

const router = express.Router();

const contactsControllers = require("../../controllers/contacts-conrtoller");

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactsById);

router.post(
  "/",
  validateBody(schemas.contactsAddSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", isValidId, contactsControllers.removeContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsControllers.updateStatusContact
);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactsAddSchema),
  contactsControllers.updateContact
);

module.exports = router;
