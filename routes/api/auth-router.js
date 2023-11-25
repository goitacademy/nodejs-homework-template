import express from 'express';
import { signup, signin } from '../../controllers/auth/index.js';

import { isEmptyBody } from '../../middlewares/index.js';
import { validateBody } from '../../decorators/index.js';
import { userSignupSchema, userSigninSchema } from '../../models/User.js';

const authRouter = express.Router();

authRouter.post('/signup', isEmptyBody, validateBody(userSignupSchema), signup);
authRouter.post('/signin', isEmptyBody, validateBody(userSigninSchema), signin);

export default authRouter;
