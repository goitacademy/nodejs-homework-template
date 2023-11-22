import { Router } from "express";
import {
  getCurrent,
  login,
  logout,
  register,
  updateSubscription,
} from "../../controllers/auth.js";
import { authValidator } from "../../middlewares/bodyValidatorWrapper.js";
import {
  loginSchema,
  registerSchema,
  subscriprionSchema,
} from "../../models/user.js";
import { authenticate } from "../../middlewares/authenticate.js";
import { ctrlWrapper } from "../../helpers/ctrlWrapper.js";

const router = Router();

router.post("/register", authValidator(registerSchema), register);

router.post("/login", authValidator(loginSchema), login);

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  authValidator(subscriprionSchema),
  ctrlWrapper(updateSubscription)
);

export default router;
