const express = require("express");

const {
  contactsList,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const { schemas } = require("../../models/book");

const { validateBody, validateBodyFavorite } = require("../../decorators");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", contactsList.getAllContacts);

router.get("/:contactId", isValidId, getContactById.getContactById);

router.post("/", validateBody(schemas.contactSchemaJoi), addContact.addContact);

router.delete("/:contactId", isValidId, deleteContact.deleteContact);

router.put(
  "/:contactId",
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
