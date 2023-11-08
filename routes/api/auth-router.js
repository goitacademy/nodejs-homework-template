const express = require("express");

const {
  signup,
  signin,
  getCurrent,
  signout,
  updateAvatar,
  verify,
} = require("../../controllers");

const { isEmptyBody, authenticate, upload } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const { userSignUpSchema, userSignInSchema } = require("../../models");
const { verify } = require("jsonwebtoken");

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);
const userEmailValidate = validateBody();
const userAvatarUpload = upload.single("avatar");

const authRouter = express.Router();

authRouter.post("/signup", isEmptyBody, userSignUpValidate, signup);

authRouter.get("/verify/:verificationToken", verify);

authRouter.post("/verify", userEmailValidate);

authRouter.post("/signin", isEmptyBody, userSignInValidate, signin);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/signout", authenticate, signout);

authRouter.patch("/avatars", authenticate, userAvatarUpload, updateAvatar);

module.exports = { authRouter };
