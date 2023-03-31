const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getOneContact,
  addContact,
  deleteContact,
  updateContact,
} = require("../../controllers");

const {
  validateAddContact,
  validateUpdateContact,
} = require("../../middleware");

router.get("/", getAllContacts);

router.get("/:id", getOneContact);

router.post("/", validateAddContact, addContact);

router.delete("/:id", deleteContact);

router.put("/:id", validateUpdateContact, updateContact);

module.exports = router;
