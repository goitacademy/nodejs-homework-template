const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../../controllers/auth.controller");
const { validateUser } = require("../../middleWares/checkUser");
const { userSchema } = require("../../schema/validateUserSchema");
const { tryCatcher } = require("../../helpers/helpers");

authRouter.post("/signup", validateUser(userSchema), tryCatcher(register));
authRouter.post("/login", validateUser(userSchema), tryCatcher(login));

module.exports = authRouter;
