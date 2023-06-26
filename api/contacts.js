const express = require("express");
const router = express.Router();
const {
  getContact,
  getContacts,
  removeContact,
  saveContact,
  updateContact,
  updateStatusContact,
} = require("../controllers/contacts");

router.get("/", getContacts);

router.get("/:id", getContact);

router.post("/", saveContact);

router.delete("/:id", removeContact);

router.put("/:id", updateContact);

router.patch("/:id/favorite/", updateStatusContact);

module.exports = router;
