const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const { isValidId } = require("../../middlewares");

const {
  validateAddContact,
  validateUpdateContact,
  validateUpdateFavoriteContact,
} = require("../../utils/validateBody.js");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactsById);

router.post(
  "/",
  validateAddContact(schemas.contactsAddSchema),
  contactsController.addContact
);

router.put(
  "/:contactId",
  isValidId,
  validateUpdateContact(schemas.contactsEditSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateUpdateFavoriteContact(schemas.contactsEditFavoriteSchema),
  contactsController.updateFavorite
);

router.delete("/:contactId", isValidId, contactsController.deleteContact);

module.exports = router;