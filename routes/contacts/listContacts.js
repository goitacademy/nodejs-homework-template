import { Router } from "express";
import { getContacts } from "../../controllers/contacts";
import guard from "../../middlewares/users/guard";
import { validateQuery } from "../../middlewares/contacts/validation";
const listContactsRouter = new Router();

listContactsRouter.get("/", [guard, validateQuery], getContacts);
export default listContactsRouter;
