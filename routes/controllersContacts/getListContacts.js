import { Router } from "express";
import getContacts from "../../controllers/contacts/getContacts";
// import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
// import { HttpCode } from "../../lib/constants";
const routerListContacts = new Router();
routerListContacts.get("/", middleware.validateQuery, getContacts);
export default routerListContacts;
