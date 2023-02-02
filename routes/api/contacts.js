const express = require("express");

const { contacts: ctrl } = require("../../controllers");
// const ctrlWrapper = require("../../middlewares/index");
const router = express.Router();

const {
  addContactValidation,
  favoriteValidation,
  ctrlWrapper,
} = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", addContactValidation, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", addContactValidation, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  favoriteValidation,
  ctrlWrapper(ctrl.patch)
);

module.exports = router;
