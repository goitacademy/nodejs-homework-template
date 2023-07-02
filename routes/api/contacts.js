const express = require("express");
const authenticate = require("../../middleware/authenticate");
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

router.get("/", authenticate, listContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(addSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(addSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
