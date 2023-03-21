const express = require("express");

const {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
} = require("../../middlewares");
const { joiSchema, updateFavorite } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();
router.get("/", auth, ctrlWrapper(ctrl.getContacts));
router.get("/:id", auth, isValidId, ctrlWrapper(ctrl.getContactById));
router.post("/", auth, validation(joiSchema), ctrlWrapper(ctrl.add));
router.delete("/:id", auth, isValidId, ctrlWrapper(ctrl.removeById));
router.put(
  "/:id",
  auth,
  isValidId,
  validation(joiSchema),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:id/favorite",
  auth,
  isValidId,
  validation(updateFavorite, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
