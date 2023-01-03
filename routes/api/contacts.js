const express = require("express");
const {
  getContacts,
  informationContact,
  createContact,
  deleteContact,
  changeContacts,
} = require("../../controllers/contacts.controller");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", informationContact);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", changeContacts);

module.exports = router;
