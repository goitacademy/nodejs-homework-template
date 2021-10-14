const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  removeContact,
  updateStatusContact,
} = require("../../controllers/contacts.js");

const {
  validateContact,
  validateStatusContact,
  validateId,
} = require("./validation");

router.get("/", getContacts);

router.get("/:contactId", validateId, getContact);

router.put("/:contactId", [validateId, validateContact], updateContact);

router.post("/", validateContact, createContact);

router.delete("/:contactId", validateId, removeContact);

router.patch(
  "/:contactId/favorite/",
  [validateId, validateStatusContact],
  updateStatusContact
);

module.exports = router;
