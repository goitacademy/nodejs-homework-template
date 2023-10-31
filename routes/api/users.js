import express from "express";
import { validateBody } from "../../middlewares/validateBody.js";
import { schemas } from "../../models/user.js";
import ctrl from "../../controllers/auth.js";
import { authenticate } from "../../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.post(
    "/register",
    validateBody(schemas.registerSchema),
    ctrl.register
);
usersRouter.post("/login", validateBody(schemas.loginSchema), ctrl.login);

usersRouter.get("/current", authenticate, ctrl.getCurrent);

usersRouter.post("/logout", authenticate, ctrl.logout);

usersRouter.patch(
    "/",
    authenticate,
    validateBody(schemas.subscriptionSchema),
    ctrl.patchUpdateSubscription
);

export default usersRouter;