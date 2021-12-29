import { Router } from "express";
import { login } from "../../controllers/users";

const loginRouter = new Router();

loginRouter.post("/login", login);

export default loginRouter;
