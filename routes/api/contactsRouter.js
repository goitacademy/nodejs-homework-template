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
const { authenticate } = require("../../middlewares");
const router = express.Router();

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, getContactById);

router.post(
  "/",
  authenticate,
  validateBody(contactValidationSchemas.addSchema),
  addContact
);

router.delete("/:contactId", authenticate, deleteContactById);

router.put(
  "/:contactId",
  authenticate,
  validateBody(contactValidationSchemas.addSchema),
  updateContactById
);
router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(contactValidationSchemas.updateFavoriteSchema),
  updateFavoriteById
);

module.exports = router;
