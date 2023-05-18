import { Router } from "express";

import { login, signUp } from "../../controller/usersController.js";

export const usersRouter = Router();

usersRouter.post('/signup', signUp);
usersRouter.post('/login', login);
usersRouter.post('/logout');