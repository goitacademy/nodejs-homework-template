const express = require("express");
const {
  conatctBodyValidation,
  favoriteValidation,
} = require("../../middlewares/contactsValidation");
const { tokenValidation } = require("../../middlewares/auth");
const { contacts: ctrl } = require("../../controllers");
const ctrlWrapper = require("../../middlewares/ctrtWrapper");
const Contacts = require("../../classControllers/contacts/Contacts");
const contacts = new Contacts();

const router = express.Router();

router.get("/", tokenValidation, ctrlWrapper(contacts.getContactsList));

router.get("/:contactId", ctrlWrapper(contacts.getContactById));

router.post(
  "/",
  tokenValidation,
  conatctBodyValidation,
  ctrlWrapper(contacts.addContact)
);

router.delete("/:contactId", ctrlWrapper(contacts.deleteContact));

router.put(
  "/:contactId",
  conatctBodyValidation,
  ctrlWrapper(contacts.changeContact)
);

router.patch(
  "/:contactId/favorite",
  favoriteValidation,
  ctrlWrapper(ctrl.changeFavorite)
);

module.exports = router;
