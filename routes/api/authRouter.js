import express from 'express';
import { validateBody } from '../../decorators/index.js';
import { usersSchemas as schemas } from '../../schemas/index.js';
import { authController as controller } from '../../controllers/index.js';
import { authenticate, upload } from '../../middleware/index.js';

// ####################################################

const authRouter = express.Router();
authRouter.use(authenticate); // for all

authRouter.post(
  '/register',
  validateBody(schemas.registerSchema),
  controller.register
);

authRouter.post('/login', validateBody(schemas.loginSchema), controller.login);

authRouter.get('/current', controller.getCurrent);

authRouter.post('/logout', controller.logout);

authRouter.patch('/', controller.updateSubscription);

authRouter.patch('/avatars', upload.single('avatar'), controller.updateAvatar);

export default authRouter;
