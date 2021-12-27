import { Router } from "express";
import { addContact } from "../../controllers";
import { validateCreate } from "../../middleware";

const routerPostContact = new Router();
routerPostContact.post("/", validateCreate, addContact);
export default routerPostContact;
