const express = require("express");
const router = express.Router();
// 
const { joiSignupSchema } = require("../../models/user");
const { joiValidation, ctrlWrapper } = require("../../middleware");
const {auth: ctrl} = require("../../controllers")
const validateJoiMiddleware = joiValidation(joiSignupSchema);

router.post("/signup", validateJoiMiddleware, ctrlWrapper(ctrl.signup));
router.post("/login", validateJoiMiddleware, ctrlWrapper(ctrl.login));


module.exports = router;
