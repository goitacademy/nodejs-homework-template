const express = require("express");
const {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = require("../controllers/contacts");
const { auth } = require("../middleware/authenticateToken");
const router = express.Router();

router.get("/", auth, getContacts);
router.get("/:contactId", auth, getContact);
router.post("/", auth, createContact);
router.put("/:contactId", auth, updateContact);
router.patch("/:contactId/favorite", auth, updateFavorite);
router.delete("/:contactId", auth, deleteContact);

module.exports = router;
