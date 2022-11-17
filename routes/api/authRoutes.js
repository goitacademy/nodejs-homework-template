const express = require("express");
const authController = require("../controllers/auth.controller");
const { tryCatchWrapper } = require("../helpers");
const { auth } = require("../middlewares/auth");

const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(authController.register));
authRouter.post("/login", tryCatchWrapper(authController.login));
authRouter.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(authController.logout));

module.exports = {
    authRouter,
};