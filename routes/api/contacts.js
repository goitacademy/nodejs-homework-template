const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const {
  addValidation,
  updateValidation,
  updateFavoriteValidation,
} = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(addValidation), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  isValidId,
  validation(updateValidation),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(updateFavoriteValidation),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
