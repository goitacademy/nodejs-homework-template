const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValid, authenticate } = require("../../middlewares");

const { addSchema, updateFavoriteSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getAll));

router.get("/:id", authenticate, isValid, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateBody(addSchema), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  authenticate,
  isValid,
  validateBody(addSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValid,
  validateBody(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", authenticate, isValid, ctrlWrapper(ctrl.removeById));

module.exports = router;
