import { Router } from "express";
import { login, logout, registration } from "../../controllers/auth";
import guard from "../../middleware/guard";
import limiter from "../../middleware/rate-limit";
const authRouter = new Router();

authRouter.post("/registration",limiter(15 * 60 * 1000, 2), registration);
authRouter.post("/login", login);
authRouter.post("/logout", guard, logout);

export default authRouter;
