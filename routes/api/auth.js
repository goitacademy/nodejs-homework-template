import { Router } from "express";
import {
  getCurrent,
  login,
  logout,
  register,
  updateAvatar,
  updateSubscription,
} from "../../controllers/auth.js";
import { authValidator } from "../../middlewares/bodyValidatorWrapper.js";
import {
  loginSchema,
  registerSchema,
  subscriprionSchema,
  updateAvatarSchema,
} from "../../models/user.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";
import { upload } from "../../middlewares/upload.js";

const router = Router();

router.post("/register", authValidator(registerSchema), register);

router.post("/login", authValidator(loginSchema), login);

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.post("/logout", authenticate, logout);

router.patch(
  "/avatars",
  authenticate,
  authValidator(updateAvatarSchema),
  upload.single("avatar"),
  ctrlWrapper(updateAvatar)
);

router.patch(
  "/",
  authenticate,
  authValidator(subscriprionSchema),
  ctrlWrapper(updateSubscription)
);

export default router;
