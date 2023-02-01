const express = require("express");
const router = express.Router();
// joyValidation,
// const { joiSchema, updateFavoriteSchema } = require("../../models/contacts");
const {  ctrWrapper } = require("../../middleware/index");
const {auth: ctr} = require("../../controllers/")
// const validateJoiMiddleware = joyValidation(joiSchema);
// const updateJoiFavoriteSchema = joyValidation(updateFavoriteSchema);

// const {
//   auth
// } = require("../../controllers/index");

// router.get("/", getAll);
// router.get("/:contactId", isValidId, getById);
router.post("/signup",  ctrWrapper(ctr.signup));
// router.put("/:contactId", isValidId, validateJoiMiddleware, updateById);
// router.patch(
//   "/:contactId/favorite",
//   isValidId,
//   updateJoiFavoriteSchema,
//   updateFavorite
// );
// router.delete("/:contactId", isValidId, deleteById);

module.exports = router;
