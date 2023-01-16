const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContact,
  newContact,
  putContact,
  deleteContact,
} = require("../../controllers/contactsController");
const { contactValidation } = require("../../middleware/validationMiddleware");

router.get("/", getContacts);

router.get("/:contactId", getContact);

router.post("/", contactValidation, newContact);

router.put("/:contactId", contactValidation, putContact);

router.delete("/:contactId", deleteContact);

module.exports = router;
