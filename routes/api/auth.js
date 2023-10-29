import express from "express";
import { validateBody } from "../../middlewares/validateBody.js";
import { schemas } from "../../models/user.js"
import ctrl from "../../controllers/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    validateBody(schemas.registerSchema),
    ctrl.register
);
authRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.patch(
    "/",
    authenticate,
    validateBody(schemas.subscriptionSchema),
    ctrl.patchUpdateSubscription
);

export default authRouter;