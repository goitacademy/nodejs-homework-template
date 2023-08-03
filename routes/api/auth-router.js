const express = require("express");
const authRouter = express.Router();

const { userSchema } = require("../../schemas");
const { validation, isAmptyBody, upload } = require("../../middlewares");

const validateMiddleWare = validation(userSchema);
const ctrl = require("../../controllers/auth/auth-controllers");

const { authenticate } = require("../../middlewares")

authRouter.post("/register", isAmptyBody, upload.single("avatar"), validateMiddleWare, ctrl.signup);

authRouter.post("/login", isAmptyBody, validateMiddleWare, ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);


module.exports = authRouter;
