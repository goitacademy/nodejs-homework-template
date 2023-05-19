const express = require("express");
const { contacts: contactsCtrl } = require("../../controllers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models");

const router = express.Router();

router.get("/", contactsCtrl.getContactsList);

router.get("/:contactId", isValidId, contactsCtrl.getContactById);

router.post("/", validateBody(schemas.addSchema), contactsCtrl.addContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  contactsCtrl.updateContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateStatusContactSchema),
  contactsCtrl.updateContactStatus
);

router.delete("/:contactId", isValidId, contactsCtrl.deleteContact);

module.exports = router;
