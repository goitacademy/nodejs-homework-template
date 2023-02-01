const express = require("express");
const router = express.Router();

const { joiSchema, updateFavoriteSchema } = require("../../models/contacts");
const { joyValidation, isValidId } = require("../../middleware/index");
const {  ctrlWrapper } = require("../../middleware/index");
const {contacts: ctrl} = require("../../controllers/index")
const validateJoiMiddleware = joyValidation(joiSchema);
const updateJoiFavoriteSchema = joyValidation(updateFavoriteSchema);

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));
router.post("/", validateJoiMiddleware,  ctrlWrapper(ctrl.addById));
router.put("/:contactId", isValidId, validateJoiMiddleware, ctrlWrapper(ctrl.updateById));
router.patch(
  "/:contactId/favorite",
  isValidId,
  updateJoiFavoriteSchema,
  ctrlWrapper(ctrl.updateFavorite)
);
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
