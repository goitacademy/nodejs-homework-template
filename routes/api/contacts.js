const express = require("express");

const { authWrapper, validation, ctrlWrapper } = require("../../middlewares");
const { joiShema, favoriteJoiSchema } = require("../../models");

const { contacts: ctrl } = require("../../controllers");

const validateMiddleware = validation(joiShema);

const router = express.Router();

router.get("/", authWrapper, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", authWrapper, validation(joiShema), ctrlWrapper(ctrl.add));

router.put("/:contactId", validateMiddleware, ctrlWrapper(ctrl.updateById));
router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
