const express = require("express");
const router = express.Router();
const cntrlContacts = require("../../controllers/contacts");
const { validateBody, validateFavorite } = require("../../middlewares");
const { addSchema } = require("../../schemas");
const { updateSchema } = require("../../schemas");
const { updateFavoriteSchema } = require("../../schemas");
const { isValidId } = require("../../middlewares");

router.get("/", cntrlContacts.getAll);

router.get("/:contactId", isValidId, cntrlContacts.getById);

router.post("/", validateBody(addSchema), cntrlContacts.addContact);

router.delete("/:contactId", isValidId, cntrlContacts.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(updateSchema),
  cntrlContacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(updateFavoriteSchema),
  cntrlContacts.updateStatusContact
);

module.exports = router;
