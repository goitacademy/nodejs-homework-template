import { Router } from "express";
import { removeContact } from "../../controllers";
import { validateId } from "../../middleware";

const routerDeleteContact = new Router();

routerDeleteContact.delete("/:id", validateId, removeContact);
export default routerDeleteContact;
