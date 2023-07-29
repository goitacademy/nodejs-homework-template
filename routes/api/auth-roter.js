import express from "express";

import authController from "../../controllers/auth-controller.js";

import usersSchemas from "../../schemas/users-schemas.js";

import {validateBody} from "../../decorators/index.js";

import {authenticate} from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(usersSchemas.userRegisterSchema), authController.register);

authRouter.post("/login", validateBody(usersSchemas.userLoginSchema), authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;