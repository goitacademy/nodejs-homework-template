import { Router } from "express";
import { getContacts } from "../../controllers";
import { validateQuery } from "../../middleware";
import guard from "../../middleware/guard";

const routerListContacts = new Router();
routerListContacts.get("/", [guard, validateQuery], getContacts);
export default routerListContacts;
