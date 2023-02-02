const express = require("express");
const router = express.Router();
// 
const { joiSignupSchema } = require("../../models/user");
const { authVerifyToken, joiValidation, ctrlWrapper } = require("../../middleware");
const {auth: ctrl} = require("../../controllers")
const validateJoiMiddleware = joiValidation(joiSignupSchema);

router.post("/signup", validateJoiMiddleware, ctrlWrapper(ctrl.signup));
router.post("/login", validateJoiMiddleware, ctrlWrapper(ctrl.login));
router.get("/logout", authVerifyToken, ctrlWrapper(ctrl.logout));


module.exports = router;
