const express = require("express");
const { contacts: ctrl } = require("../../controllers");
const {
  validation,
  ctrlWrapper,
  isValidId,
  auth,
} = require("../../middlewares");
const {
  addValidation,
  updateValidation,
  updateFavoriteValidation,
} = require("../../schemas");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(addValidation), ctrlWrapper(ctrl.add));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.remove));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(updateValidation),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(updateFavoriteValidation),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
