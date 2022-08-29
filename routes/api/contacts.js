const { contacts: ctrl } = require("../../controllers");
const { userAuth, validation, ctrlWrapper } = require("../../middlewares");
const { joiContactSchema, favoriteJoiContactSchema } = require("../../models");
const express = require("express");

const router = express.Router();

router.get("/", userAuth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", userAuth, validation(joiContactSchema), ctrlWrapper(ctrl.add));

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
