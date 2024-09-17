const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers");
const {
  validateNewContact,
  validateUpdatedContact,
} = require("../../middleware/contacts");
const isValidId = require("../../middleware/isValidId");
const { addSchema, updateFavoriteSchema } = require("../../schemes/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateNewContact(addSchema), addContact);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateUpdatedContact(addSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateUpdatedContact(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
