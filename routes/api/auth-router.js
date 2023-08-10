const express = require("express");
const authRouter = express.Router();

const { userSchema } = require("../../schemas");
const { validation, isAmptyBody, upload, resize } = require("../../middlewares");

const validateMiddleWare = validation(userSchema);
const ctrl = require("../../controllers/auth/auth-controllers");

const { authenticate } = require("../../middlewares");

authRouter.post(
	"/register",
	upload.single("avatar"),
	isAmptyBody,
	validateMiddleWare,
	ctrl.signup
);

authRouter.post("/login", isAmptyBody, validateMiddleWare, ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), resize, ctrl.updAvatar);

// authRouter.get("/verify/:verificationToken");


module.exports = authRouter;
