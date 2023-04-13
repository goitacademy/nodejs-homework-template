const express = require("express");

const router = express.Router();

const {
  validation,
  ctrlWrapper,
  isValidId,
  validationForFavorite,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const { contacts: ctrl } = require("../../controllers");
router.get("/", ctrlWrapper(ctrl.getAll));

router.post("/", validation(schemas.addSchema), ctrlWrapper(ctrl.add));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));
router.put(
  "/:id",
  isValidId,
  validation(schemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  validationForFavorite(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
