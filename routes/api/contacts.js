const express = require("express");
const contactsCtrl = require("../../controllers/contacts");
const { addValid, updateValid, updateFavoriteValid } = require("../../middlewares/validation");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", contactsCtrl.listContacts);

router.get("/:contactId", isValidId, contactsCtrl.getContactById);

router.post(
  "/",
  addValid,
  contactsCtrl.addContact
);

router.delete("/:contactId", isValidId, contactsCtrl.removeContact);

router.put(
  "/:contactId",
  isValidId,
  updateValid,
  contactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite", isValidId,
  updateFavoriteValid,
  contactsCtrl.updateStatusContact
);

module.exports = router;
