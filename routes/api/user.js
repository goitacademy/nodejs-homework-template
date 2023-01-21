const express = require("express");
const { tryCatchWrapper } = require("../../helpers/index");
const {  auth } = require("../../middlewares");
const {
  logout,
  current,
} = require("../../controllers/user.controller");

const userRouter = express.Router();


userRouter.get("/logout", tryCatchWrapper(auth), tryCatchWrapper(logout));
userRouter.get("/current", tryCatchWrapper(auth), tryCatchWrapper(current));

module.exports = {
  userRouter,
};
