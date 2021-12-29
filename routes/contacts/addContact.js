import { Router } from "express";
import { addContactCb } from "../../controllers/contacts";
import guard from "../../middlewares/users/guard";
import { validateAdd } from "../../middlewares/contacts/validation";
const createRouter = new Router();

createRouter.post("/", [guard, validateAdd], addContactCb);
export default createRouter;
