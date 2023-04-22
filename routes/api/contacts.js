const express = require("express");
const router = express.Router();
const ctrlContacts = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares");
const { addSchema } = require("../../schemas");
const { updateSchema } = require("../../schemas");
const { updateFavoriteSchema } = require("../../schemas");
const { isValidId } = require("../../middlewares");

router.get("/", ctrlContacts.getAll);

router.get("/:contactId", isValidId, ctrlContacts.getById);

router.post("/", validateBody(addSchema), ctrlContacts.addContact);

router.delete("/:contactId", isValidId, ctrlContacts.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateSchema),
  ctrlContacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  ctrlContacts.updateFavorite
);

module.exports = router;
