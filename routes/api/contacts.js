const express = require("express");
const {
  getByIdContact,
  getListContact,
  removeByIdContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");
const router = express.Router();

router.get("/", getListContact);

router.get("/:contactId", getByIdContact);

router.post("/", addContact);

router.delete("/:contactId", removeByIdContact);

router.put("/:contactId", updateContact);

module.exports = router;
