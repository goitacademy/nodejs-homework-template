const express = require("express");
const router = express.Router();
const { auth: controllers } = require("../../controllers");
const { joiSignUpSchema, joiLoginSchema } = require("../../models/user");
const { auth, validation } = require("../../middlewares");

router.post("/signup", validation(joiSignUpSchema), controllers.signup);

router.post("/login", validation(joiLoginSchema), controllers.login);

router.post("/logout", auth, controllers.logout);

module.exports = router;
