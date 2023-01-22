const express = require("express");
const { tryCatchWrapper } = require("../../helpers");
const { register, login, logout } = require("../../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(login));
authRouter.post("/logout", tryCatchWrapper(logout));

module.exports = {
  authRouter,
};
