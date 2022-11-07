const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  postContactValidation,
  putContactValidation,
} = require("../../models/validationContacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:id", getContactById);

router.post("/", postContactValidation, addContact);

router.delete("/:id", removeContact);

router.put("/:id", putContactValidation, updateContact);

module.exports = router;
