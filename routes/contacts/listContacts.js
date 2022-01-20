import { Router } from "express";
import { getContacts } from "../../controllers/contacts";
import { validateQuery } from "../../middlewares/contacts/validation";
import wrapperError from "../../middlewares/error-handler";
import guard from "../../middlewares/guard";

const listContactsRouter = new Router();

listContactsRouter.get("/", [guard, validateQuery], wrapperError(getContacts));
export default listContactsRouter;