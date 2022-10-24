const express = require("express");
const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewars");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;

// hw-03
