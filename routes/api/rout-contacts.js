const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
} = require("../../controllers");

const {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
} = require("../../middleware");

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", validateCreateContact, createContact);

router.put("/:id", validateUpdateContact, updateContact);

router.patch("/:id/favorite", validateUpdateStatusContact, updateStatusContact);

router.delete("/:id", deleteContact);

module.exports = router;
