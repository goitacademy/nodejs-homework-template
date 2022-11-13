const express = require("express");
const userControlers = require("../controlers/userControlers");
const { tryCatchWrapper } = require("../helpers/index");
const { userMiddlewares } = require("../middleweras/userMiddlewares");

const userRouter = express.Router();

userRouter.post("/register", tryCatchWrapper(userControlers.register));
userRouter.post("/login", tryCatchWrapper(userControlers.login));
userRouter.post("/logout", tryCatchWrapper(userMiddlewares), tryCatchWrapper(userControlers.logout));
userRouter.get("/current", tryCatchWrapper(userMiddlewares), tryCatchWrapper(userControlers.current));

module.exports = {
  userRouter,
};
