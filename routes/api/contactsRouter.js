const express = require("express");
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("../../controllers/contacts");
const validateBody = require("../../middlewares/validateBody");
const isValidId = require("../../middlewares/isValidId");
const {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
} = require("../../schemas/contactsSchemas");

router.get("/", getAllContacts);

router.get("/:id", isValidId, getContactById);

router.post("/", validateBody(contactAddSchema), addContact);

router.put("/:id", isValidId, validateBody(contactUpdateSchema), updateContact);

router.delete("/:id", isValidId, removeContact);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(contactUpdateFavoriteSchema),
  updateFavorite
);

module.exports = router;
