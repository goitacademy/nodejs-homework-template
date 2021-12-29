import { Router } from "express";
import { registration } from "../../controllers/users";

const registrationRouter = new Router();

registrationRouter.post("/signup", registration);

export default registrationRouter;
