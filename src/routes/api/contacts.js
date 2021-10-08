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
} = require("../../controllers/controllersContacts");

router.get("/", getContacts);

router.get("/:contactId", validateId, getContact);

router.post("/", validateContact, addContact);

router.put("/:contactId", [validateId, validateContact], updateContact);

router.delete("/:contactId", validateId, deleteContact);

router.patch("/:contactId", [validateId, validateUpdateContact], updateContact);

router.patch(
  "/:contactId/favorite",
  [validateId, validateStatusContact],
  updateStatusContact
);

module.exports = router;
