const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
} = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../schemas/contacts");

router.get("/", authenticate, listContacts);

router.get("/:id", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(addSchema), addContact);

router.delete("/:id", authenticate, isValidId, removeContact);

router.put("/:id", authenticate, isValidId, validateBody(addSchema), updateContact);

router.patch("/:id/favorite", authenticate, isValidId, validateBody(updateFavoriteSchema), updateFavorite);

module.exports = router;