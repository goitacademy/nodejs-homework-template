const express = require("express");
const contacts = require("../../controllers/contacts");
const {
  validateBody,
  validateFavorite,
  isValidId,
  authenticate,
} = require("../../middlewares");
const Schemas = require("../../schemas");

const router = express.Router();

router.get("/", authenticate, contacts.listContacts);

router.get("/:contactId", authenticate, isValidId, contacts.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(Schemas.bodySchema),
  contacts.addContact
);

router.delete("/:contactId", authenticate, isValidId, contacts.removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(Schemas.bodySchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavorite(Schemas.favoriteSchema),
  contacts.updateStatusContact
);

module.exports = router;
