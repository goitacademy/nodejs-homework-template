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
  validateParams,
} = require("../../middlewares/validation");
const {
  addSchema,
  byIdSchema,
  changeFavotiteSchema,
} = require("../../utils/validation/contactValidationSchemas");
const { verefyToken } = require("../../middlewares/verefyToken");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", validateParams(byIdSchema), getContactById);

router.post("/", validateBody(addSchema), verefyToken, addContact);

router.delete(
  "/:contactId",
  validateParams(byIdSchema),
  verefyToken,
  removeContact
);

router.put("/:contactId", validateBody(addSchema), verefyToken, updateContact);

router.patch(
  "/:contactId/favorite",
  validateParams(byIdSchema),
  validateBody(changeFavotiteSchema),
  verefyToken,
  updateContactFavorite
);

module.exports = router;
