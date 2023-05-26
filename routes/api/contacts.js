const express = require("express");
const { contacts: contactsCtrl } = require("../../controllers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models");

const router = express.Router();

router.get("/", authenticate, contactsCtrl.getContactsList);

router.get("/:contactId", authenticate, isValidId, contactsCtrl.getContactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  contactsCtrl.addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  contactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  contactsCtrl.updateContactStatus
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  contactsCtrl.deleteContact
);

module.exports = router;
