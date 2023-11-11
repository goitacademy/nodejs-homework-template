const express = require("express");
const  ctrlWrapper  = require("../../helpers/ctrlWrapper ");
const {
  register,
  login,
  logout,
  userInfo,
  upSubscription,
} = require("../../controllers/auth.controller");
const {
    authUser,
    upUserSubscription,
} = require("../../validJoi/validUsers");
const { validAuth } = require("../../helpers/validAuth");
const { validToken } = require("../../helpers/validToken");

const authRouter = express.Router();

authRouter.post("/register", validAuth(authUser), ctrlWrapper(register));
authRouter.get("/login", validAuth(authUser), ctrlWrapper(login));
authRouter.post("/logout", ctrlWrapper(validToken), ctrlWrapper(logout));
authRouter.get("/current", ctrlWrapper(validToken), ctrlWrapper(userInfo));
authRouter.patch(
    "/",
    ctrlWrapper(validToken),
    validAuth(upUserSubscription),
    ctrlWrapper(upSubscription)
);

module.exports = {
    authRouter,
};