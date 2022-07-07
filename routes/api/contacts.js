const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId, isAuthorized } = require("../../middlewares");
const { schemas } = require("../../models/contact");

router.get("/", isAuthorized, ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", isAuthorized, validation(schemas.add), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  isValidId,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validation(schemas.updateFavorite),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
