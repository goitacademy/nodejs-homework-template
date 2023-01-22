const express = require("express");
const { addUserSchema } = require("../../schemas/users");
const { validateBody } = require("../../middlewares/index");
const { tryCatchWrapper } = require("../../helpers/index");
const {
  register,
  login,
  logout,
} = require("../../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(addUserSchema),
  tryCatchWrapper(register)
);
authRouter.post("/login", tryCatchWrapper(login));
authRouter.post("/logout", tryCatchWrapper(logout));
module.exports = { authRouter };
