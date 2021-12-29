import { Router } from "express";
import { login, logout, registration } from "../../controllers/auth";
import guard from "../../middleware/guard";
const authRouter = new Router();

authRouter.post("/registration", registration);
authRouter.post("/login", login);
authRouter.post("/logout", guard, logout);

export default authRouter;
