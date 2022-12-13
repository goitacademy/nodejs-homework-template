const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const validateMiddleware = validation(schemas.contactsSchema);

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  isValidId,
  validateMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
