const express = require("express");

const {
  getContacts,
  getContactById,
  postContact,
  deleteContact,
  putContact,
} = require("../../controllers/contacts");

const router = express.Router();
router.get("/", getContacts);
router.get("/:contactId", getContactById);
router.post("/", postContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", putContact);

module.exports = router;
