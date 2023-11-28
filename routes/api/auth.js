const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../decorators");
const schemas = require("../../schemas/users");

const { authenticate } = require("../../middlewares");

const signupValidateMiddleware = validateBody(schemas.userSignupSchema);
const signinValidateMiddleware = validateBody(schemas.userSigninSchema);

const router = express.Router();

router.post("/signup", signupValidateMiddleware, ctrl.signup);

router.post("/signin", signinValidateMiddleware, ctrl.signin);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/signout", authenticate, ctrl.signout);

module.exports = router;
