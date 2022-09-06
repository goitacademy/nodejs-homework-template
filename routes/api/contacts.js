const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

const controller = require("../../controllers/");
const {
  listContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
} = controller;

router.get("/", listContacts);

router.get("/:id", getContactById);

router.post("/", addContact);

router.delete("/:contactId", deleteContact);

router.put("/:id", updateContact);

module.exports = router;
