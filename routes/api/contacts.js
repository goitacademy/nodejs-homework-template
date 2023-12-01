const express = require("express");

const { contactsController: ctrl } = require("../../controllers");
const { ctrlWrapper, validation, isValidId } = require("../../middlerwares");
const { errMsg2, errMsg1 } = require("../../messages/messagesError");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validation(schemas.contactsSchema, errMsg2),
  ctrlWrapper(ctrl.addNew)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.contactsSchema, errMsg1),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema, errMsg2),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
