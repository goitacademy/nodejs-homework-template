const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const { validation, ctrlWrapper, current } = require("../../middlewares");

const { joiSchema, patchSchema } = require("../../models/contact");

const router = express.Router();

router.get("/", current, ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", current, validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.patch(
  "/:id/favorite",
  validation(patchSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
