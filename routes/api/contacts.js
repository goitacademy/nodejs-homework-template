const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");
const { validateBody } = require("../../middleware/contacts");
const isValidId = require("../../middleware/isValidId");
const { addSchema, updateFavoriteSchema } = require("../../schemes/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put("/:contactId", isValidId, validateBody(addSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
