const express = require("express");

const { validateBody, isValidId } = require("../../middlewares");

const { addSchema, updateFavoriteSchema } = require("../../schemas/contacts");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, validateBody(addSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
