const express = require("express");
const ctrl = require("../../controllers/index");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const {
  validation,
  updateContactValidation,
  updateFavoriteValidation,
  isValidId,
} = require("../../middlewares");
const {
  contactsShema,
  addShema,
  updateFavoriteSchema,
} = require("../../schemas");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validation(addShema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  isValidId,
  updateContactValidation(contactsShema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId",
  isValidId,
  updateFavoriteValidation(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
