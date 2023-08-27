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
  validationBody,
  validationById,
  validationFavorite,
} = require("../../middlewares/validation");
const {
  addSchema,
  byIdSchema,
  changeFavotiteSchema,
} = require("../../utils/validation/contactValidationSchemas");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", validationById(byIdSchema), getContactById);

router.post("/", validationBody(addSchema), addContact);

router.delete("/:contactId", validationById(byIdSchema), removeContact);

router.put("/:contactId", validationBody(addSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  validationById(byIdSchema),
  validationFavorite(changeFavotiteSchema),
  updateContactFavorite
);

module.exports = router;
