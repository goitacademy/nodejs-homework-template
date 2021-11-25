const {
  conatctBodyValidation,
  favoriteValidation,
} = require("../../middlewares/validation");
const express = require("express");
const router = express.Router();
const { contacts: ctrl } = require("../../controllers");
const ctrlWrapper = require("../../middlewares/ctrtWrapper");

router.get("/", ctrlWrapper(ctrl.getContactsList));

router.get("/:contactId", ctrlWrapper(ctrl.getContactByIdHandler));

router.post("/", conatctBodyValidation, ctrlWrapper(ctrl.postContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put("/:contactId", conatctBodyValidation, ctrlWrapper(ctrl.putContact));

router.patch(
  "/:contactId/favorite",
  favoriteValidation,
  ctrlWrapper(ctrl.changeFavorite)
);

module.exports = router;
