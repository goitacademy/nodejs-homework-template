const express = require("express");
const router = express.Router();
const { contactsCtrl } = require("../../controllers");
const validateBody = require("../../middlewares/validateBody");
const {
  contactsModel: { schemas },
} = require("../../models");
const isValidId = require("../../middlewares/isValidId");
const authenticate = require("../../middlewares/authenticate");

router.get("/", authenticate, contactsCtrl.getAllContacts);

router.get(
  "/:contactId",
  authenticate,
  isValidId,
  contactsCtrl.getContactsById
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addContactSchema),
  contactsCtrl.addContact
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsCtrl.removeContactById
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addContactSchema),
  contactsCtrl.updateContactById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsCtrl.updateFavoriteContact
);

module.exports = router;
