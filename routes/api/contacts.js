const express = require("express");

const router = express.Router();
const { auth, validation, ctrlWrapper } = require("../..//middleware");
const { joiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateStatus));

router.patch(
  "/:id/favorite",
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);

router.delete("/:id", ctrlWrapper(ctrl.removeById));

module.exports = router;
