const express = require("express");
const contacts = require("../../controllers/contacts");
const {
  validateBody,
  validateFavorite,
  isValidId,
} = require("../../middlewares");
const { Schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:contactId", isValidId, contacts.getContactById);

router.post("/", validateBody(Schemas.bodySchema), contacts.addContact);

router.delete("/:contactId", isValidId, contacts.removeContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(Schemas.bodySchema),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(Schemas.favoriteSchema),
  contacts.updateStatusContact
);

module.exports = router;
