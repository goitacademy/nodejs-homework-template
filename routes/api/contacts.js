const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactFavorite,
} = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validation");
const {
  addSchema,
  changeFavotiteSchema,
} = require("../../utils/validation/contactValidationSchemas");
const { verefyToken } = require("../../middlewares/verefyToken");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(addSchema), verefyToken, addContact);

router.delete("/:contactId", verefyToken, removeContact);

router.put("/:contactId", validateBody(addSchema), verefyToken, updateContact);

router.patch(
  "/:contactId/favorite",
  validateBody(changeFavotiteSchema),
  verefyToken,
  updateContactFavorite
);

module.exports = router;
