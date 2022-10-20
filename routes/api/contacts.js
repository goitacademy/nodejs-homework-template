const express = require("express");
const { schemas } = require("../../service/schemasContacts");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { isValidId, authenticate } = require("../../middleware");

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  schemas.bodyValidation,
  ctrlWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  schemas.bodyValidation,
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  schemas.favoriteValidation,
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
