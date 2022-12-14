const express = require("express");

const { validation, ctrlWrapper, auth } = require("../../middlewares");

const { auth: ctrl } = require("../../controllers");

const router = express.Router();

const { joiSignUpSchema, joiLoginSchema } = require("../../models/user");

router.post("/signup", validation(joiSignUpSchema), ctrlWrapper(ctrl.signUp));

router.get("/logout", auth, ctrlWrapper(ctrl.logOut));

router.post("/login", validation(joiLoginSchema), ctrlWrapper(ctrl.logIn));

module.exports = router;
