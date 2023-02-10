const express = require("express");

const { signup, login, logout } = require("../../controllers/auth.controller");
const { tryCatchWrapper } = require("../../utils/helpers/rtyCatchHelper");
const { authToken } = require("../../utils/validation/validationToken");

const authRouter = express.Router();

authRouter.post("/signup", tryCatchWrapper(signup));
authRouter.post("/login", tryCatchWrapper(login));
authRouter.post("/logout", tryCatchWrapper(authToken), tryCatchWrapper(logout));

module.exports = {
  authRouter,
};
