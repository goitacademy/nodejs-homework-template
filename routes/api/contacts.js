const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValid } = require("../../middlewares");

const { addSchema, updateFavoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValid, ctrlWrapper(ctrl.getById));

router.post("/", validateBody(addSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  isValid,
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  isValid,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", isValid, ctrlWrapper(ctrl.removeById));

module.exports = router;
