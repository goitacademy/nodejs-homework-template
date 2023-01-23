const express = require("express");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
} = require("../../controllers/auth.controller");
const { validateUser } = require("../../middleWares/checkUser");
const { checkToken } = require("../../middleWares/checkToken");
const { userSchema } = require("../../schema/validateUserSchema");
const { tryCatcher } = require("../../helpers/helpers");

authRouter.post("/signup", validateUser(userSchema), tryCatcher(register));
authRouter.post("/login", validateUser(userSchema), tryCatcher(login));
authRouter.post("/logout", tryCatcher(checkToken), tryCatcher(logout));

module.exports = authRouter;
