import express from "express";
import authController from "../../controllers/auth-controller.js";
import usersSchemas from "../../schemas/users-schemas.js";
import { validateBody } from "../../decorators/index.js";

const authRouter = express.Router();

authRouter.post(
	"/users/register",
	validateBody(usersSchemas.userRegisterSchema),
	authController.login,
);

authRouter.post("/users/login", validateBody(usersSchemas.userLoginSchema));
export default authRouter;
