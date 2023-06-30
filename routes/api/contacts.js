const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { contactJoiSchema, favoriteJoiSchema } = require("../../schemas");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", auth, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  auth,
  validation(contactJoiSchema, "missing required name field"),
  ctrlWrapper(ctrl.add)
);

router.delete("/:contactId", auth, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  auth,
  validation(contactJoiSchema, "missing fields"),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  validation(favoriteJoiSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
