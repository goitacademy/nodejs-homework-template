/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { addSchema, updateFavorite } = require("../../models/contact");

const validateMiddleware = validation(addSchema);

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", validateMiddleware, ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  isValidId,
  validateMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));

router.patch(
  "/:id/favorite",
  isValidId,
  validation(updateFavorite),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeContact));

module.exports = router;
