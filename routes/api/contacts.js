const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { joiContactSchema, favoriteJoiContactSchema } = require("../../models");
const express = require("express");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiContactSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put(
  "/:contactId",
  validation(joiContactSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiContactSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
