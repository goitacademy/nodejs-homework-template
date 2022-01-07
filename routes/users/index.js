import { Router } from "express";
import { aggregation } from "../../controllers/users";
import guard from "../../middleware/guard";
import roleAccess from "../../middleware/role-access";
import { Role } from "../../lib/constants";
const usersRouter = new Router();

usersRouter.get("/stats/:id", guard, roleAccess(Role.ADMIN), aggregation);

export default usersRouter;
