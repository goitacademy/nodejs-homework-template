import express from "express";
import "dotenv/config";

import authCtrl from "../../controllers/auth-controller.js";
import { authSchema, emailSchema, subscriptionSchema } from "../../models/index.js";
import { validateBody } from "../../decorators/index.js";
import { authenticate, upload } from "../../middlewares/index.js";

const router = express.Router();

router.patch("/", authenticate, validateBody(subscriptionSchema), authCtrl.subscriptionChange);

router.post("/register", validateBody(authSchema), authCtrl.register);
router.get("/verify/:verificationToken", authCtrl.verifyEmail);
router.post("/verify", validateBody(emailSchema), authCtrl.resendVerifyEmail);

router.post("/login", validateBody(authSchema), authCtrl.login);

router.get("/current", authenticate, authCtrl.getCurrent);

router.post("/logout", authenticate, authCtrl.logout);

router.patch("/avatars", authenticate, upload.single("avatar"), authCtrl.updateAvatar);

export default router;
