const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId, isAuth } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", isAuth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isAuth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  isAuth,
  validation(schemas.addContact, "missing required fields"),
  ctrlWrapper(ctrl.addContact)
);

router.patch(
  "/:contactId/favorite",
  isAuth,
  isValidId,
  validation(schemas.updateStatusContact, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  "/:contactId",
  isAuth,
  isValidId,
  validation(schemas.updateContact, "missing fields"),
  ctrlWrapper(ctrl.updateContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
