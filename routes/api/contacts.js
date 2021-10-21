const express = require("express");
const router = express.Router();
const {
  updateFavoriteContact,
  updateContact,
  deleteContact,
  getContacts,
  getContact,
  createContact,
} = require("../../controllers/contacts");

const {
  validateContact,
  validateId,
  validateUpdateContact,
  validateFavoriteStatus,
} = require("../validation");

router.get("/", getContacts);

router.get("/:contactId", validateId, getContact);

router.post("/", validateContact, createContact);

router.delete("/:contactId", validateId, deleteContact);

router.put("/:contactId", [validateId, validateUpdateContact], updateContact);

router.patch(
  "/:contactId/favorite/",
  [validateId, validateFavoriteStatus],
  updateFavoriteContact
);

module.exports = router;
