const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");
const auth = require("../../middleware/auth");
const {
  postValidationSchema,
  updateValidationSchema,
} = require("../../middleware/validationContacts");

const router = express.Router();

router.get("/", auth, listContacts);

router.get("/:contactId", auth, getContactById);

router.post("/", auth, postValidationSchema, addContact);

router.delete("/:contactId", auth, removeContact);

router.put("/:contactId", auth, updateValidationSchema, updateContact);

router.patch("/:contactId/favorite", auth, updateStatusContact);

module.exports = router;
