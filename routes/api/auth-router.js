import express from 'express';

import { isEmptyBody, authenticate } from '../../middlewares/index.js';
import { ctrlWrapper } from '../../decorators/index.js';
import { current, signin, signout, signup, updateSubscription } from '../../controllers/auth-controller.js';
import validateBody from '../../decorators/validateBody.js';
import { authSchema, patchSubscription } from '../../schemas/user-schemas.js'

const usersRouter = express.Router();

usersRouter.post('/register', isEmptyBody, validateBody(authSchema), ctrlWrapper(signup));

usersRouter.post('/login', isEmptyBody, validateBody(authSchema), ctrlWrapper(signin));

usersRouter.post('/logout', ctrlWrapper(authenticate), ctrlWrapper(signout));

usersRouter.get('/current', ctrlWrapper(authenticate), ctrlWrapper(current));

usersRouter.patch('/', ctrlWrapper(authenticate), isEmptyBody, validateBody(patchSubscription), ctrlWrapper(updateSubscription));

export default usersRouter;