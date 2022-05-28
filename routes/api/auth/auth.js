const { Router } = require("express");
const { authControllers } = require("../../../controllers");
const { registration, login, logout, currentUser } = authControllers;
const { guard, userValidation } = require("../../../middleware");

const authRouter = Router();

authRouter.route("/signup").post(userValidation, registration);
authRouter.route("/login").post(userValidation, login);
authRouter.route("/logout").post(guard, logout);
authRouter.route("/current").post(currentUser);

module.exports = authRouter;
