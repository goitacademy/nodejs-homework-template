const express = require("express");
const {
  addValid,
  updateValid,
  updateFavoriteValid,
} = require("../../middlewares/contactsValidation");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const userVerification = require("../../middlewares/userVerification");
const contactsCtrl = require("../../controllers/contacts.js"); // Змінено

const router = express.Router();

router.get("/", authenticate, contactsCtrl.listContactsForUser);
router.get("/:contactId", authenticate, isValidId, contactsCtrl.getContactById);
router.post("/", authenticate, addValid, contactsCtrl.addContact);
router.delete("/:contactId", authenticate, userVerification, isValidId, contactsCtrl.removeContact);
router.put("/:contactId", authenticate, userVerification, isValidId, updateValid, contactsCtrl.updateContact);
router.patch("/:contactId/favorite", authenticate, userVerification, isValidId, updateFavoriteValid, contactsCtrl.updateStatusContact);

module.exports = router;

