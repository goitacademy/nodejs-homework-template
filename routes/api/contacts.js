const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, isValidId } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models");

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  "/",
  validation(schemas.addContactsSchema),
  ctrlWrapper(ctrl.addContact)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteContactById));

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.uptadeContactById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;