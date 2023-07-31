import express from "express";
import { validateBody } from "../../decorators/index.js";
import usersSchemas from "../../schemes/index.js";
import authControllers from "../../controllers/auth-controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authControllers.signup);

authRouter.post("/signin", validateBody(usersSchemas.userSigninSchema), authControllers.signin)

export default authRouter;