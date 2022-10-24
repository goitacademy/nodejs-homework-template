const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { auth, validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/?favorite=true", auth, ctrlWrapper(ctrl.favorite));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", auth, validateBody(schemas.joiSchema), ctrlWrapper(ctrl.add));

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
