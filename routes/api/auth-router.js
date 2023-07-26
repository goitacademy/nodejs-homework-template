import express from 'express';
import usersSchemas from '../../schemas/users-schemas.js';
import authController from '../../controllers/auth-controller.js';
import { validateBody } from '../../decorators/index.js';
import { authenticate, isEmptyBody } from '../../middlewars/index.js';

const authRouter = express.Router();


authRouter.post("/register", validateBody(usersSchemas.authSchema), authController.register);

authRouter.post("/login", validateBody(usersSchemas.authSchema), authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/", authenticate, isEmptyBody, validateBody(usersSchemas.updateSubscriptionSchema), authController.updateSubscription);


export default authRouter;