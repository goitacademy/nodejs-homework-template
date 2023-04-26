const express = require("express");
const ctrl = require("../../controllers");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  validation,
  updateContactValidation,
  updateFavoriteValidation,
  isValidId,
  authenticate,
} = require("../../middlewares");
const {
  contactsShema,
  addShema,
  updateFavoriteSchema,
} = require("../../schemas");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validation(addShema), ctrlWrapper(ctrl.add));

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeById)
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  updateContactValidation(contactsShema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateFavoriteValidation(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
