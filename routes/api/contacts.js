const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { auth, validation, isValidId } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { contactSchemas } = require("../../models");

router.get("/", auth, ctrlWrapper(ctrl.listContactsCtrl));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactByIdCtrl));

router.post( "/", validation(contactSchemas.addContactsSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteContactByIdCtrl));

router.put("/:contactId", validation(contactSchemas.addContactsSchema), isValidId, ctrlWrapper(ctrl.uptadeContactByIdCtrl));


router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(contactSchemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
