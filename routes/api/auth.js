import express from "express";
import {
	logInSchema,
	patchSubscriptionSchema,
	registerSchema,
} from "../../models/user.js";
import { ctrlWrapper, validateBody } from "../../decorators/index.js";
import {
	login,
	register,
	getCurrent,
	logout,
	patchSubscription,
} from "../../controllers/authController.js";
import { isEmptyBody, authenticate } from "../../middlewares/index.js";

const router = express.Router();

router.post(
	"/register",
	isEmptyBody,
	validateBody(registerSchema),
	ctrlWrapper(register)
);

router.post(
	"/login",
	isEmptyBody,
	validateBody(logInSchema),
	ctrlWrapper(login)
);

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.post("/logout", authenticate, ctrlWrapper(logout));

router.patch(
	"/",
	authenticate,
	validateBody(patchSubscriptionSchema),
	ctrlWrapper(patchSubscription)
);

export default router;
