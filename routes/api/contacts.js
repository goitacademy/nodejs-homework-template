const express = require("express");
const router = express.Router();
const {
  validateContact,
  validateIdContact,
  validateStatusContact,
} = require("./validation");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusFavoriteContact,
} = require("../../controllers/contacts");

router.get("/", getContacts);

router.get("/:contactId", validateIdContact, getContact);

router.post("/", validateContact, createContact);

router.delete("/:contactId", validateIdContact, deleteContact);

router.put("/:contactId", [validateIdContact, validateContact], updateContact);

router.patch(
  "/:contactId/favorite",
  [validateIdContact, validateStatusContact],
  updateStatusFavoriteContact
);

module.exports = router;
