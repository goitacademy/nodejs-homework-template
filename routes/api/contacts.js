const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactFavorite
} = require("../../controllers/contacts");
const { validateBody } = require("../../middlewars/validateBody");
const isValidId = require("../../middlewars/isValidId");
const { addSchema, updateFavoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, validateBody(addSchema), updateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(updateFavoriteSchema), updateContactFavorite);

module.exports = router;
