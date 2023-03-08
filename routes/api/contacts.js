const express = require("express");

const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const { joiSchema, updateFavorite } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();
router.get("/", ctrlWrapper(ctrl.getContacts));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getContactById));
router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));
router.put(
  "/:id",
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  isValidId,
  validation(updateFavorite, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
