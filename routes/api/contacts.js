const express = require("express");

const { joiSchema, favoriteSchema } = require("../../models/contact");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  validation(favoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

module.exports = router;
