const express = require("express");

const { contacts: ctrl } = require("../../controllers");
const router = express.Router();

const {
  auth,
  addContactValidation,
  favoriteValidation,
  ctrlWrapper,
} = require("../../middlewares");

router.get("/", auth, ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", auth, addContactValidation, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.removeById));

router.put("/:contactId", addContactValidation, ctrlWrapper(ctrl.updateById));

router.patch(
  "/:contactId/favorite",
  favoriteValidation,
  ctrlWrapper(ctrl.patch)
);

module.exports = router;
