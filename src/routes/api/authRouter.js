const express = require("express");
const authRouter = express.Router();
const { tryCatchWrapper } = require("../../helpers");
const {
  register,
  login,
  logout,
  getCurrentUser,
  updateUserSubscription,
} = require("../../controllers/authController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

authRouter.post("/register", tryCatchWrapper(register));
authRouter.post("/login", tryCatchWrapper(login));
authRouter.post("/logout", authMiddleware, tryCatchWrapper(logout));
authRouter.get("/current", authMiddleware, tryCatchWrapper(getCurrentUser));
authRouter.patch(
  "/subscription",
  authMiddleware,
  tryCatchWrapper(updateUserSubscription)
);

module.exports = authRouter;
