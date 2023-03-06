const express = require("express");

const {
  getContact,
  fetchContactById,
  createContact,
  deleteContact,
  editContact,
} = require("../../controllers/ContactController");

const {
  addContactValidation,
  updateContactValidation,
} = require("../../middlewares/validation");

const router = express.Router();

router.get("/", getContact);

router.get("/:contactId", fetchContactById);

router.post("/", addContactValidation, createContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", updateContactValidation, editContact);

module.exports = router;
