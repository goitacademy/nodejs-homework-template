const express = require("express");

const ctrl = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");
const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", ctrlWrapper(ctrl.add));

router.put("/:contactId", isValidId, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  isValidId,
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;