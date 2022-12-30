const express = require("express");
const router = express.Router();

const {
  validation,
  ctrlWrapper,
  validationObjectId,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", validationObjectId, ctrlWrapper(ctrl.getById));

router.post("/", validation(schemas.joiAddSchema), ctrlWrapper(ctrl.add));

router.patch(
  "/:contactId/favorite",
  validationObjectId,
  validation(schemas.joiUpdateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", validationObjectId, ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validationObjectId,
  validation(schemas.joiAddSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
