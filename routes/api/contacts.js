const express = require("express");
const router = express.Router();

const { ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const isValidId = require("../../middlewares/isValidId");
const { joiSchema, joiStatusSchema } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getByID));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", isValidId, validation(joiSchema), ctrlWrapper(ctrl.update));

router.patch(
  "/:id/favorite",
  isValidId,
  validation(joiStatusSchema),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
