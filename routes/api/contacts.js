const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schemas.joiSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.joiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
