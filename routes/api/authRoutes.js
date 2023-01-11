const express = require("express");
const AuthControllers = require("../../controllers/UserController");
const { validation, authMiddleware } = require("../../middelwares");
const { authSchema } = require("../../shemas");

const validationAuth = validation(authSchema);

const authRouter = express.Router();

authRouter.post("/register", validationAuth, AuthControllers.singup);
authRouter.post("/login", validationAuth, AuthControllers.singin);
authRouter.get("/logout", authMiddleware, AuthControllers.logout);
authRouter.get("/current", authMiddleware, AuthControllers.current);
authRouter.patch("/", authMiddleware, AuthControllers.subscriptionUpdate);

module.exports = authRouter;
