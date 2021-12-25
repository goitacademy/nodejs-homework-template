import { Router } from "express";
import { getContacts } from "../../controllers/contacts";
import { validateQuery } from "../../middlewares/contacts/validation";
const listContactsRouter = new Router();

listContactsRouter.get("/", validateQuery, getContacts);
export default listContactsRouter;