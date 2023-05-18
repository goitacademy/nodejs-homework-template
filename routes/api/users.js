import { Router } from "express";
import { auth } from "../../middlewares.js";
import { current, login, logout, signUp } from "../../controller/usersController.js";

export const usersRouter = Router();

usersRouter.post('/signup', signUp);
usersRouter.post('/login', login);
usersRouter.get('/logout', auth, logout);
usersRouter.get('/current', auth, current);