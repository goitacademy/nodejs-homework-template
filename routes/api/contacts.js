const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contacts");
const {
  validateBody,
  validateById,
  validateFavorite,
} = require("../../middlewares/validation");
const {
  addSchema,
  byIdSchema,
  changeFavotiteSchema,
} = require("../../utils/validation/contactValidationSchemas");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", validateById(byIdSchema), getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", validateById(byIdSchema), removeContact);

router.put("/:contactId", validateBody(addSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  validateById(byIdSchema),
  validateFavorite(changeFavotiteSchema),
  updateContactFavorite
);

module.exports = router;
