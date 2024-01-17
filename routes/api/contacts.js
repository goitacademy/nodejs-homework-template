const express = require("express");
const { contactsControllers } = require("../../controllers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { contactsSchemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, contactsControllers.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(contactsSchemas.addContactSchema),
  contactsControllers.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsControllers.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(contactsSchemas.addContactSchema),
  contactsControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(contactsSchemas.favoriteContactSchema),
  contactsControllers.updateFavoriteContact
);

module.exports = router;