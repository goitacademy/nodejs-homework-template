const express = require("express");

const contacts = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(contacts.listContacts));

router.get("/:id", isValidId, ctrlWrapper(contacts.getContactById));

router.post(
  "/",
  validation(schemas.addContact),
  ctrlWrapper(contacts.addContact)
);

router.delete("/:id", isValidId, ctrlWrapper(contacts.removeContact));

router.put(
  "/:id",
  isValidId,
  validation(schemas.addContact),
  ctrlWrapper(contacts.updateContact)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validation(schemas.updateFavorite),
  ctrlWrapper(contacts.updateFavorite)
);

module.exports = router;
