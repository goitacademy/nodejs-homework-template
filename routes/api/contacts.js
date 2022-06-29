const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const {
  contactsJoiSchema,
  favoriteJoiSchema,
} = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(contactsJoiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactsJoiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
