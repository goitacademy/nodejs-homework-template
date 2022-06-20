const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const {
  contactsJoiSchema,
  favoriteJoiSchema,
} = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(contactsJoiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(contactsJoiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
