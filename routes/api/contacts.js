const express = require("express");

const {
  validation,
  ctrlWrapper,
  isValidId,
  auth,
} = require("../../middlewares");
const { schemaAdd, schemaFavorite } = require("../../models/contact");
const { contacts } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(contacts.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(contacts.getById));

router.post("/", auth, validation(schemaAdd), ctrlWrapper(contacts.addContact));

router.delete("/:contactId", ctrlWrapper(contacts.deleteContact));

router.put(
  "/:contactId",
  isValidId,
  validation(schemaAdd),
  ctrlWrapper(contacts.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemaFavorite),
  ctrlWrapper(contacts.updateStatusContact)
);

module.exports = router;
