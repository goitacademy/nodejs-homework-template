import { Router } from "express";
import { logout } from "../../controllers/users";
import guard from "../../middlewares/users/guard";

const logoutRouter = new Router();

logoutRouter.get("/logout", guard, logout);

export default logoutRouter;
