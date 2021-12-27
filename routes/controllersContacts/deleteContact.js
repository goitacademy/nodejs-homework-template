import { Router } from "express";
import removeContact from "../../controllers/contacts/removeContact";
// import contactsApp from "../../contactsApp/index";
import middleware from "../../middleware";
// import { HttpCode } from "../../lib/constants";

const routerDeleteContact = new Router();

routerDeleteContact.delete("/:id", middleware.validateId, removeContact);
export default routerDeleteContact;
