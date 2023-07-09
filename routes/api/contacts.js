const express = require("express");
const router = express.Router();
const { contactsCtrl } = require("../../controllers");
const validateBody = require("../../middlewares/validateBody");
const { schemas } = require("../../models/contacts");
const isValidId = require("../../middlewares/isValidId");

router.get("/", contactsCtrl.getAllContacts);

router.get("/:contactId", isValidId, contactsCtrl.getContactsById);

router.post(
  "/",
  validateBody(schemas.addContactSchema),
  contactsCtrl.addContact
);

router.delete("/:contactId", isValidId, contactsCtrl.removeContactById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addContactSchema),
  contactsCtrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsCtrl.updateFavoriteContact
);

module.exports = router;
