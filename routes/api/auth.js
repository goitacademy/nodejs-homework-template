import express from "express";
import { logInSchema, registerSchema } from "../../models/user.js";
import { ctrlWrapper, validateBody } from "../../decorators/index.js";
import {
	login,
	register,
	getCurrent,
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

export default router;
