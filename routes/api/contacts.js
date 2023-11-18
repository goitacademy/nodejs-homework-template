const express = require("express");

const {
  getById,
  getAll,
  createContact,
  updateContact,
  removeContact,
  faoriteContact,
} = require("../../controllers/contactControllers");
const { contactValidation } = require("../../models/contact");
const isValidId = require("../../validation/isValidid");

const router = express.Router();

router.get("/", getAll);

router.get("/:contactId", isValidId, getById);

router.post("/", createContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId", isValidId, faoriteContact);

module.exports = router;
// hello
