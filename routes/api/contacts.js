const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  getFavoriteContacts,
  addContact,
  removeContact,
  updateContact,
  toggleFavorite,
} = require("../../controllers/contactsController");

router.get("/", getContacts);
router.get("/:id", getContactById);
router.get("/:id/favorite", getFavoriteContacts);
router.post("/", addContact);
router.delete("/:id", removeContact);
router.put("/:id", updateContact);
router.patch("/:contactId/favorite", toggleFavorite);

module.exports = router;
