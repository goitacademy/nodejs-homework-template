const express = require("express");

const router = express.Router();
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schema");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", ctrlWrapper(ctrl.getContactById));
router.post(
  "/",
  validation(contactSchema, "missing required name field"),
  ctrlWrapper(ctrl.add)
);
router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));
router.put(
  "/:contactId",
  validation(contactSchema, "missing fields"),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  validation(contactSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateToFavorite)
);

module.exports = router;
