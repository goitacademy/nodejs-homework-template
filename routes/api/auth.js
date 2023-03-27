const express = require("express");
const {
  register,
  login,
  getCurrentUser,
} = require("../../controllers/authController");
const { tryCatchWrapper } = require("../../helpers");
const { validateBody } = require("../../middlewares/index");
const { addUserSchema } = require("../../schemas/userSchema");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(addUserSchema),
  tryCatchWrapper(register)
);
authRouter.post("/login", validateBody(addUserSchema), tryCatchWrapper(login));
authRouter.get("/current", tryCatchWrapper(getCurrentUser));

module.exports = {
  authRouter,
};
