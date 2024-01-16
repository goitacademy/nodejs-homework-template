import express from "express";
import { logInSchema, registerSchema } from "../../models/user.js";
import { ctrlWrapper, validateBody } from "../../decorators/index.js";
import { login, register } from "../../controllers/authController.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";

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

export default router;
