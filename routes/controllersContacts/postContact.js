import { Router } from "express";
import { addContact } from "../../controllers";
import { validateCreate } from "../../middleware";
import guard from "../../middleware/guard";

const routerPostContact = new Router();
routerPostContact.post("/", [guard, validateCreate], addContact);
export default routerPostContact;
