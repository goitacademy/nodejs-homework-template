import { Router } from "express";
import { addContact } from "../../controllers/contacts";
// import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
// import { HttpCode } from "../../lib/constants";

const routerPostContact = new Router();
routerPostContact.post("/", middleware.validateCreate, addContact);
export default routerPostContact;
