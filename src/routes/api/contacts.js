const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  toggleFavoriteContact,
} = require("../../controllers/contactController");
const {
  addValidation,
  updateValidation,
  mongoIdValidation,
} = require("../../utils/validation");

const router = express.Router();

router.get("/", getContacts);
router.get("/:contactId", mongoIdValidation, getContactById);
router.delete("/:contactId", mongoIdValidation, removeContact);
router.post("/", addValidation, addContact);
router.put("/:contactId", mongoIdValidation, updateValidation, updateContact);
router.patch("/:contactId/favorite", mongoIdValidation, toggleFavoriteContact);

module.exports = router;
