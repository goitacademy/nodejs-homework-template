const express = require("express");
const router = express.Router();

const { joiSchema, updateFavoriteSchema } = require("../../models/contacts");
const { joiValidation, isValidId, authVerifyToken,  ctrlWrapper } = require("../../middleware");
const {contacts: ctrl} = require("../../controllers/index")
const validateJoiMiddleware = joiValidation(joiSchema);
const updateJoiFavoriteSchema = joiValidation(updateFavoriteSchema);

router.get("/", authVerifyToken, ctrlWrapper(ctrl.getAll));
router.get("/:contactId", isValidId, ctrlWrapper(ctrl.getById));
router.post("/", authVerifyToken, validateJoiMiddleware,  ctrlWrapper(ctrl.addById));
router.put("/:contactId", isValidId, validateJoiMiddleware, ctrlWrapper(ctrl.updateById));
router.patch(
  "/:contactId/favorite",
  isValidId,
  updateJoiFavoriteSchema,
  ctrlWrapper(ctrl.updateFavorite)
);
router.delete("/:contactId", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
