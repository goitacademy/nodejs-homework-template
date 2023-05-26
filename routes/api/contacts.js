const express = require("express");

const {
  contactsList,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/contact");

const { validateBody, validateBodyFavorite } = require("../../decorators");
const { isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, contactsList.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  getContactById.getContactById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.contactSchemaJoi),
  addContact.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  deleteContact.deleteContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.contactSchemaJoi),
  updateContact.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBodyFavorite(schemas.updateFavoriteSchema),
  updateStatusContact.updateStatusContact
);

module.exports = router;
