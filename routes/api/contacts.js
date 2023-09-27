const express = require("express");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { schemas } = require("../../utils/validation");
const { contacts: ctrl } = require("../../controlers");

const validationMiddleware = validation(schemas.contactsAddSchema);
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validationMiddleware, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteScheme),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.put(
  "/:contactId",
  isValidId,
  validationMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
