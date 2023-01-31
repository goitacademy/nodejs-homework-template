const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const isValidId = require("../../middlewares/isValidId");
const { schemas } = require("../../models/contact");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", isValidId, ctrlWrapper(ctrl.getByID));

router.post("/", validation(schemas.joiContact), ctrlWrapper(ctrl.add));

router.put(
  "/:id",
  isValidId,
  validation(schemas.joiContact),
  ctrlWrapper(ctrl.update)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validation(schemas.joiStatus),
  ctrlWrapper(ctrl.updateStatus)
);

router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
