import express from 'express';
import authController from '../../controllers/auth-controller.js';
import { validateBody } from '../../decorator/index.js';
import usersSchemas from '../../schemas/users-schemas.js';


const authRouter = express.Router();

authRouter.post("/signup", validateBody(usersSchemas.userSignupSchema), authController.signup)

export default authRouter;