const express = require("express");
const {
  register,
  login,
  getCurrentUser,
  logout,
} = require("../../controllers/authController");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody, auth } = require("../../middlewares/index");
const { addUserSchema } = require("../../schemas/userSchema");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(addUserSchema),
  tryCatchWrapper(register)
);
authRouter.post("/login", validateBody(addUserSchema), tryCatchWrapper(login));
authRouter.get("/current", auth, tryCatchWrapper(getCurrentUser));
authRouter.get("/logout", auth, tryCatchWrapper(logout));

module.exports = {
  authRouter,
};
