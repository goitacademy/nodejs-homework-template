import { Router } from "express";
import { getContacts } from "../../controllers";
import { validateQuery } from "../../middleware";
const routerListContacts = new Router();
routerListContacts.get("/", validateQuery, getContacts);
export default routerListContacts;
