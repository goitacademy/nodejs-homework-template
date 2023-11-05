const express = require("express");
const { contactsControllers } = require("../../controllers");
const { validateContactBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", contactsControllers.getAllContacts);

router.get("/:contactId", isValidId, contactsControllers.getContactById);

router.post(
  "/",
  validateContactBody(schemas.addContactSchema),
  contactsControllers.addContact
);

router.delete("/:contactId", isValidId, contactsControllers.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateContactBody(schemas.addContactSchema),
  contactsControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateContactBody(schemas.favoriteContactSchema),
  contactsControllers.updateFavoriteContact
);

module.exports = router;
