const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validation(schemas.addContact, "missing required fields"),
  ctrlWrapper(ctrl.addContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateStatusContact, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.updateContact, "missing fields"),
  ctrlWrapper(ctrl.updateContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
