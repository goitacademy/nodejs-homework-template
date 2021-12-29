import { Router } from "express";
import { addContactCb } from "../../controllers/contacts";
import { validateAdd } from "../../middlewares/contacts/validation";
import guard from "../../../midllewares/guard";

const createRouter = new Router();

createRouter.post("/", [guard, validateAdd], addContactCb);
export default createRouter;