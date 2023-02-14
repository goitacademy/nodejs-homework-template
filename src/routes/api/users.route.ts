import express from 'express';
import { asyncWrapper } from 'helpers/apiHelpers';
import { registerController } from 'controllers/users.controller';
import { authValidation } from 'middlewares/users.validation.middleware';

const authRouter = express.Router();

authRouter.post('/register', authValidation, asyncWrapper(registerController));
// authRouter.post('/login', addContactValidation, asyncWrapper(addContactController));
// authRouter.post('/logout', addContactValidation, asyncWrapper(addContactController));

export default authRouter;
