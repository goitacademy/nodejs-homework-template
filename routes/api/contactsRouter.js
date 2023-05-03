const express = require("express");
const {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  updateFavoriteById,
  deleteContactById,
} = require("../../controllers/contacts.controllers");

const { contactValidationSchemas } = require("../../utils/validation");
const { validateBody } = require("../../utils");
const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(contactValidationSchemas.addSchema), addContact);

router.delete("/:contactId", deleteContactById);

router.put(
  "/:contactId",
  validateBody(contactValidationSchemas.addSchema),
  updateContactById
);
router.patch(
  "/:contactId/favorite",
  validateBody(contactValidationSchemas.updateFavoriteSchema),
  updateFavoriteById
);

module.exports = router;
