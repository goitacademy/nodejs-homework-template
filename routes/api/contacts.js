const express = require("express");
const contactsCtrl = require("../../controllers/contacts.js");
const {
  addValid,
  updateValid,
  updateFavoriteValid,
} = require("../../middlewares/contactsValidation");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");
const userVerification = require("../../middlewares/userVerification");

const router = express.Router();

// Перевірте, що contactsCtrl.listContactsForUser визначено правильно
router.get("/", authenticate, contactsCtrl.listContactsForUser);

// Перевірте, що contactsCtrl.getContactById визначено правильно
router.get("/:contactId", authenticate, isValidId, contactsCtrl.getContactById);

// Перевірте, що contactsCtrl.addContact визначено правильно
router.post("/", authenticate, addValid, contactsCtrl.addContact);

// Перевірте, що contactsCtrl.removeContact визначено правильно
router.delete("/:contactId", authenticate, userVerification, isValidId, contactsCtrl.removeContact);

// Перевірте, що contactsCtrl.updateContact визначено правильно
router.put("/:contactId", authenticate, userVerification, isValidId, updateValid, contactsCtrl.updateContact);

// Перевірте, що contactsCtrl.updateStatusContact визначено правильно
router.patch("/:contactId/favorite", authenticate, userVerification, isValidId, updateFavoriteValid, contactsCtrl.updateStatusContact);

module.exports = router;
