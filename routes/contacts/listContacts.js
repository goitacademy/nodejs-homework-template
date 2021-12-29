import { Router } from "express";
import { getContacts } from "../../controllers/contacts";
import { validateQuery } from "../../middlewares/contacts/validation";
import guard from "../../../midllewares/guard";

const listContactsRouter = new Router();

listContactsRouter.get("/", [guard, validateQuery], getContacts);
export default listContactsRouter;