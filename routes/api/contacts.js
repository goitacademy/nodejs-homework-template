const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  editContact,
  setFavoriteContact,
} = require("../../controllers/contacts.controller");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", getContact);
router.post("/", createContact);
router.delete("/:contactId", deleteContact);
router.put("/:contactId", editContact);
router.patch("/:contactId/favorite", setFavoriteContact);

module.exports = router;
