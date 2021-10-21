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
  // validateId,
  // validateUpdateContact,
} = require("../validation");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", validateContact, createContact);

router.delete("/:contactId", deleteContact);

router.put(
  "/:contactId",
  // validateId,
  // validateUpdateContact,
  updateContact
);

router.patch(
  "/:contactId/favorite/",
  // validateUpdateContact,
  updateFavoriteContact
);

module.exports = router;
