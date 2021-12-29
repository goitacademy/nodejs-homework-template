import { Router } from "express";
import { removeContact } from "../../controllers";
import { validateId } from "../../middleware";
import guard from "../../middleware/guard";
const routerDeleteContact = new Router();

routerDeleteContact.delete("/:id", [guard, validateId], removeContact);
export default routerDeleteContact;
