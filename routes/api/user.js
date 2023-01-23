const express = require("express");
const userRouter = express.Router();
const {
  register,
  login,
  logout,
  current,
  subscriptionUpdate,
} = require("../../controllers/auth.controller");
const { auth } = require("../../middleWares/auth");
const { validateUser } = require("../../middleWares/checkUser");
const { userSchema } = require("../../schema/validateUserSchema");
const {
  subscriptionSchema,
} = require("../../schema/validateSubscriptionSchema");
const { tryCatcher } = require("../../helpers/helpers");

userRouter.post("/signup", validateUser(userSchema), tryCatcher(register));
userRouter.post("/login", validateUser(userSchema), tryCatcher(login));
userRouter.get("/logout", tryCatcher(auth), tryCatcher(logout));
userRouter.get("/current", tryCatcher(auth), tryCatcher(current));
userRouter.patch(
  "/",
  tryCatcher(auth),
  validateUser(subscriptionSchema),
  tryCatcher(subscriptionUpdate)
);

module.exports = userRouter;
