const express = require("express");

const router = express.Router();

const { ctrl } = require("../../controllers");

const { validation, ctrlWrapper } = require("../../middlewares");

const { joiSchema, joiStatusSchema } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getByID));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.update));

router.patch(
  "/:id/favorite",
  validation(joiStatusSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
