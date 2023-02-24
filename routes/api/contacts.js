const express = require("express");

const router = express.Router();
const { validation, ctrlWrapper, isValidId } = require("../../middlewares");
const {
  schema: { joiAddSchema, joiUpdateSchema },
} = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getContactById));
router.post(
  "/",
  validation(joiAddSchema, "missing required name field"),
  ctrlWrapper(ctrl.add)
);
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));
router.put(
  "/:contactId",
  isValidId,
  validation(joiAddSchema, "missing fields"),
  ctrlWrapper(ctrl.updateById)
);
router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(joiUpdateSchema, "missing field favorite"),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
