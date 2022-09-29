const express = require("express");
const { schemas } = require("../../service/schemas");
const { asyncWrapper } = require("../../helpers/apiHelpers");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");

router.get("/", asyncWrapper(ctrl.getAll));

router.get("/:contactId", asyncWrapper(ctrl.getById));

router.post("/", schemas.bodyValidation, asyncWrapper(ctrl.addContact));

router.delete("/:contactId", asyncWrapper(ctrl.deleteContact));

router.put(
  "/:contactId",
  schemas.bodyValidation,
  asyncWrapper(ctrl.updateContact)
);

router.patch(
  "/:contactId/favorite",
  schemas.favoriteValidation,
  asyncWrapper(ctrl.updateStatusContact)
);

module.exports = router;
