const express = require("express");
const router = express.Router();
const {
  getContacts,
  getById,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contacts.js");

router.get("/", getContacts);
router.get("/:contactId", getById);
router.post("", postContact);
router.put("/:contactId", putContact);
router.delete("/:contactId", deleteContact);

module.exports = router;
