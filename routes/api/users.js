import express from "express";
import mdlwr from "../../middlewares/index.js";
import ctrl from "../../controllers/index.js";
import models from "../../models/index.js";

export const router = express.Router();

const { ctrlWrapper, validation, auth, upload } = mdlwr;

const { user } = ctrl;
const {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  reVerification,
} = user;

const { userModel } = models;
const { joiUserSchema, joiVerifySchema } = userModel;

router.post("/signup", validation(joiUserSchema), ctrlWrapper(register));

router.post("/login", validation(joiUserSchema), ctrlWrapper(login));

router.get("/logout", auth, ctrlWrapper(logout));

router.get("/current", auth, ctrlWrapper(getCurrent));

router.patch("/", auth, ctrlWrapper(updateSubscription));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

router.post(
  "/verify",
  validation(joiVerifySchema),
  ctrlWrapper(reVerification)
);
