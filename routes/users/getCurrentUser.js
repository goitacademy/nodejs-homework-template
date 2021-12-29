import { Router } from "express";
import { getCurrentUser } from "../../controllers/users";
import guard from "../../middlewares/users/guard";

const currentRouter = new Router();

currentRouter.get("/current", guard, getCurrentUser);

export default currentRouter;
