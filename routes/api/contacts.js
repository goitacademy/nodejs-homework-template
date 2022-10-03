const express = require("express");
const { schemas } = require("../../service/schemas");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const isValidId = require("../../middleware/isValidId");

router.get("/", asyncWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, asyncWrapper(ctrl.getById));

router.post("/", schemas.bodyValidation, asyncWrapper(ctrl.addContact));

router.delete("/:contactId", isValidId, asyncWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  isValidId,
  schemas.bodyValidation,
  asyncWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  schemas.favoriteValidation,
  asyncWrapper(ctrl.updateStatusContact)
);

module.exports = router;
