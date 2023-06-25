const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactJoiSchema, favoriteJoiSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post(
  "/",
  validation(contactJoiSchema, "missing required name field"),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(contactJoiSchema, "missing fields"),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
