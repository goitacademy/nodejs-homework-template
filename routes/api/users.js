const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const { auth, validation } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { userSignupSchema, userLoginSchema } = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(userSignupSchema), ctrlWrapper(ctrl.signup));
router.post("/login", validation(userLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;
