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
const guard = require("../../helpers/guard");

router.get("/", guard, getContacts);

router.get("/:contactId", guard, validateIdContact, getContact);

router.post("/", guard, validateContact, createContact);

router.delete("/:contactId", guard, validateIdContact, deleteContact);

router.put(
  "/:contactId",
  guard,
  [validateIdContact, validateContact],
  updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  [validateIdContact, validateStatusContact],
  updateStatusFavoriteContact
);

module.exports = router;
