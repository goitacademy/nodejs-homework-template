const express = require("express");
const router = express.Router();
const {
  validateContact,
  validateUpdateContact,
  validateStatusContact,
  validateId,
} = require("./validationContact");

const {
  getContacts,
  getContact,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
} = require("../../controllers/contacts");
const guard = require("../../../helpers/guard");

router.get("/", guard, getContacts);

router.get("/:contactId", guard, validateId, getContact);

router.post("/", guard, validateContact, addContact);

router.put(
  "/:contactId",
  guard,
  [(validateId, validateContact)],
  updateContact
);

router.delete("/:contactId", guard, validateId, deleteContact);

router.patch(
  "/:contactId",
  guard,
  [(validateId, validateUpdateContact)],
  updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  [(validateId, validateStatusContact)],
  updateStatusContact
);

module.exports = router;
