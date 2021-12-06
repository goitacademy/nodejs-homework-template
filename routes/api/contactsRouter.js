const express = require("express");
const {
  conatctBodyValidation,
  favoriteValidation,
} = require("../../middlewares/contactsValidation");
const { tokenValidation } = require("../../middlewares/auth");
const { contacts: ctrl } = require("../../controllers");
const ctrlWrapper = require("../../middlewares/ctrtWrapper");

const router = express.Router();

router.get("/", tokenValidation, ctrlWrapper(ctrl.getContactsList));

router.get("/:contactId", ctrlWrapper(ctrl.getContactByIdHandler));

router.post(
  "/",
  tokenValidation,
  conatctBodyValidation,
  ctrlWrapper(ctrl.postContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

router.put("/:contactId", conatctBodyValidation, ctrlWrapper(ctrl.putContact));

router.patch(
  "/:contactId/favorite",
  favoriteValidation,
  ctrlWrapper(ctrl.changeFavorite)
);

module.exports = router;
