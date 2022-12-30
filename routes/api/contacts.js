const express = require("express");
const router = express.Router();

const { validation, ctrlWrapper } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.joiAddSchema), ctrlWrapper(ctrl.add));

router.patch(
  "/:contactId/favorite",
  validation(schemas.joiUpdateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(schemas.joiAddSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
