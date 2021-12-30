import { Router } from "express";
import { registration } from "../../controllers/users";
import limiter from "../../middlewares/users/rateLimit";

const registrationRouter = new Router();

registrationRouter.post("/signup", limiter(15 * 60 * 1000, 2), registration);

export default registrationRouter;
