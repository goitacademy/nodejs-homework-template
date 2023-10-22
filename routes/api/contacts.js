const express = require("express");
const {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateFavorite,
  deleteContact,
} = require("../../controlers/contacts");
const router = express.Router();
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemaContact } = require("../../schemas");

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemaContact.addSchema),
  createContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemaContact.addSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemaContact.updateFavoriteSchame),
  updateFavorite
);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

module.exports = router;
