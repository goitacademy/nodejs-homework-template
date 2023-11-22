const express = require("express");
const contactsCtrl = require("../../controllers/contacts");
const {
  addValid,
  updateValid,
  updateFavoriteValid,
} = require("../../middlewares/contactsValidation");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

const router = express.Router();

router.get("/", authenticate, contactsCtrl.listContacts);

router.get("/:contactId", authenticate, isValidId, contactsCtrl.getContactById);

router.post("/", authenticate, addValid, contactsCtrl.addContact);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsCtrl.removeContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  updateValid,
  contactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateFavoriteValid,
  contactsCtrl.updateStatusContact
);

module.exports = router;
