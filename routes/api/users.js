const express = require("express");

const router = express.Router();

const { validation, auth } = require("../../middlewars");
const { users: controllers } = require("../../controllers");
const { joiSignupSchema, joiLoginSchema } = require("../../models/user");
router.post("/signup", validation(joiSignupSchema), controllers.signup);
router.post("/login", validation(joiLoginSchema), controllers.login);
router.get("/current", auth, controllers.currentUser);

module.exports = router;
