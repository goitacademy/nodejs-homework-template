const express = require("express");

const {
  getById,
  getAll,
  createContact,
  updateContact,
  removeContact,
  faoriteContact,
} = require("../../controllers/contactControllers");

const isValidId = require("../../validation/isValidid");
const { authenticate } = require("../../middleware/autenticate");

const router = express.Router();

router.get("/", authenticate, getAll);
router.get("/:contactId", authenticate, isValidId, getById);
router.post("/", authenticate, createContact);
router.delete("/:contactId", authenticate, removeContact);
router.put("/:contactId", authenticate, isValidId, updateContact);
router.patch("/:contactId", authenticate, isValidId, faoriteContact);

module.exports = router;
