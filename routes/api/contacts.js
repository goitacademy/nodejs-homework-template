const express = require("express");

const { contactsValidation } = require("../../middlewares/contactValidation");
const {
  getContacts,
  getById,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contactsController");

const router = express.Router();

router.get("/", getContacts);

router.get("/:id", getById);

router.post("/", contactsValidation, createContact);

router.delete("/:id", deleteContact);

router.put("/:id", contactsValidation, changeContact);

module.exports = router;
