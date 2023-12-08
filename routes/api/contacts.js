const express = require("express");

const { contactsController: ctrl } = require("../../controllers");
const { validation, isValidId, authenticate } = require("../../middlerwares");
const { errMsg2, errMsg1 } = require("../../messages/messagesError");
const { schemas } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  validation(schemas.contactsSchema, errMsg2),
  ctrlWrapper(ctrl.addNew)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(schemas.contactsSchema, errMsg1),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validation(schemas.updateFavoriteSchema, errMsg2),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
