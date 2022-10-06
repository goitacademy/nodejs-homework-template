const express = require("express");
const { schemas } = require("../../service/schemasContacts");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const { isValidId, authenticate } = require("../../middleware");

router.get("/", authenticate, asyncWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, asyncWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  schemas.bodyValidation,
  asyncWrapper(ctrl.addContact)
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  asyncWrapper(ctrl.deleteContact)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  schemas.bodyValidation,
  asyncWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  schemas.favoriteValidation,
  asyncWrapper(ctrl.updateStatusContact)
);

module.exports = router;
