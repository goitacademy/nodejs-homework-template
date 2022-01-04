import { Router } from "express";
import guard from "../../middlewares/users/guard";
import { validateAdd } from "../../middlewares/contacts/validation";
import { ContactsService } from "../../controllers/contacts";
const contactsService = new ContactsService();
const createRouter = new Router();

createRouter.post("/", [guard, validateAdd], contactsService.addContactCb);
export default createRouter;
