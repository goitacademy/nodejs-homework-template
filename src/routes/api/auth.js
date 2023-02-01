const express = require("express");
const router = express.Router();
// 
const { joiSignupSchema } = require("../../models/user");
const { joiValidation, ctrlWrapper } = require("../../middleware");
const {auth: ctrl} = require("../../controllers")
const validateJoiMiddleware = joiValidation(joiSignupSchema);
// const updateJoiFavoriteSchema = joyValidation(updateFavoriteSchema);

// const {
//   auth
// } = require("../../controllers/index");

// router.get("/", getAll);
// router.get("/:contactId", isValidId, getById);
router.post("/signup", validateJoiMiddleware, ctrlWrapper(ctrl.signup));
// router.put("/:contactId", isValidId, validateJoiMiddleware, updateById);
// router.patch(
//   "/:contactId/favorite",
//   isValidId,
//   updateJoiFavoriteSchema,
//   updateFavorite
// );
// router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
