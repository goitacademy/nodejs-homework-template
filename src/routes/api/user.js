const express = require("express");
const router = express.Router();

const { authVerifyToken, joiValidation, ctrlWrapper } = require("../../middleware");
const { users: ctrl } = require("../../controllers");
const { joiUpdateUserSchema } = require("../../models/user");
const validateJoiMiddleware = joiValidation(joiUpdateUserSchema);


router.get("/current", authVerifyToken, ctrlWrapper(ctrl.getCurrent));
router.patch("/subscribe", authVerifyToken, validateJoiMiddleware, ctrlWrapper(ctrl.updateSubscribe));

module.exports = router;
