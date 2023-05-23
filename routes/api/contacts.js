const express = require("express");

const contactsController = require("../../controllers/contacts-controllers");

const { schemas } = require("../../models/contacts");

const {
  validateBody,
  isValidId,
  validateFavBody,
} = require("../../decorators");

const router = express.Router();

router.get("/", contactsController.getAllContacts);

router.get("/:contactId", isValidId, contactsController.getContactById);

router.post(
  "/",
  validateBody(schemas.contactAddSchema),
  contactsController.addContact
);

router.delete("/:contactId", isValidId, contactsController.deleteContactById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavBody(schemas.updateFavoriteSchema),
  contactsController.updateStatusContact
);

module.exports = router;
