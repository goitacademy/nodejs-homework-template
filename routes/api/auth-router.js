import express from "express";

import authCtrl from "../../controllers/auth-controllers.js";

import usersSchemas from "../../schemas/users-schemas.js";

import { validateBody, authenticate } from "../../middlewares/index.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authCtrl.signup);

authRouter.post("/signin", validateBody(usersSchemas.userSigninSchema), authCtrl.signin);

authRouter.get("/current", authenticate, authCtrl.getCurrent);

authRouter.post("/signout", authenticate, authCtrl.signout);

export default authRouter;
